#!/bin/bash

# Converts a Google spreadsheet to geojson, v. 2.

# Set up some variables
me=$(whoami)
key="1by5Xo90wcyYJBWkZs-dtqpkCnoKPlf6CJdEmyXJ4rZ4"
dest="/Users/$me/Documents/github/local/temples"
temp=$(echo $TMPDIR | sed 's:/$::')

# Path to include homebrew stuff like jq for running via launchctl
export PATH=$PATH:/usr/local/bin

# Create the vrt file for the conversion from csv to geojson
text="      <OGRVRTDataSource>"
text="$text     <OGRVRTLayer name=\"sheet\">"
text="$text         <SrcDataSource>$temp/sheet.csv</SrcDataSource>"
text="$text         <GeometryType>wkbPoint</GeometryType>"
text="$text         <LayerSRS>WGS84</LayerSRS>"
text="$text         <GeometryField encoding=\"PointFromColumns\" x=\"longitude\" y=\"latitude\"/>"
text="$text     </OGRVRTLayer>"
text="$text </OGRVRTDataSource>"

echo $text > "$temp/sheet.vrt"

# Get google doc as xml via the public feed
xml=$(curl -s -stdout "https://spreadsheets.google.com/feeds/list/$key/1/public/values")
if [ -z xml ]
   then
   echo 1>&2 "No result from Google spreadsheet server"
   exit
fi

# Clean up the entry names & save to file for ogr2ogr
echo $xml | tidy -xml -iq | sed 's/gsx://g' > "$temp/sheet.xml"

# Convert to csv
rm "$temp/sheet.csv" 2>/dev/null
ogr2ogr -f csv "$temp/sheet.csv" "$temp/sheet.xml"

# Convert to bad geojson
rm "$temp/sheet.json" 2>/dev/null
ogr2ogr -skipfailures -f geojson "$temp/sheet.json" "$temp/sheet.vrt"

# Clear false 0,0 coords resulting from empty fields, and remove some unwanted properties that were stuck in during the xml export.
cat "$temp/sheet.json"  | perl -pe "s/\[ 0\.0, 0\.0 \]/\"\"/g"  | jq '.' | \
   grep -v -e \"id\": \
   -e \"title\": \
   -e \"title_type\": \
   -e \"updated\": \
   -e \"category_scheme\": \
   -e \"category_term\": \
   -e \"content\": \
   -e \"content_type\": \
   -e \"link_rel\": \
   -e \"link_type\": \
   -e \"link_href\": \
   > "$temp/temples.json"

# Get rid of last bit of extra stuff from the xml
jq '{type: .type, features: .features}' "$temp/temples.json" > "$dest/temples.json"

# For mapping, save a second copy with only entries including coordinates
head -n 3 "$dest/temples.json" > "$temp/temples.json"
text=$(jq -c '.features[] | select (.geometry.coordinates != "")' "$dest/temples.json" | tr '\n' ',')
text="$text ]}"
echo $(echo $text | sed 's/, \]\}/\]\}/') >> "$temp/temples.json"
jq '.' "$temp/temples.json" > "$dest/maps/temples.json"