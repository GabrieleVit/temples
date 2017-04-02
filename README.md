# temples
Stuff on temples of the Classical world (Greek and Roman and Etruscan, etc)

## List of files

- README.md - This file.
- pleiades\_types.txt - List of the feature types from [Pleiades](http://pleiades.stoa.org). Created from a daily dump of May, 2016.
- DARE\_count.csv - a rough count of items for each DARE type ID, generated by Estimate count of DARE items.applescript in this folder.
- DARE\_Pleiades\_type\_crosswalk.csv - Crosswalk between the DARE and Pleiades types.
- DARE\_type\_ids.csv - List of the item types with their IDs in the Digital Atlas of the  Roman Empire (DARE). Compiled by hand for reference. See the less complete, but official version at <http://dare.ht.lu.se/print.php?doc=info_api>.
- Estimate count of DARE items.applescript - a script to estimate the number of items for each DARE ID. It outputs to DARE\_count.csv in this folder.
- temple\_bib.json: Bibliography in CSL JSON format on such temples from my [Zotero](https://zotero.org/) [library](https://www.zotero.org/john_muccigrosso/items). The bibliography contains citekeys which can be used in place of the full entry in other files and then converted by such things as pandoc.
- citations.csv: file joining reference citation from the Zotero library to the temple IDs.
- chicago-author-date.csl - the standard csl for this style, but with citations formatted as biblio. Used to generate simple cite-key:citation pairs for csv.

## List of folders

- downloads - data files from various existing databases (Pleiades, vici.org, DARE)
- forbidden - for storing passwords
- maps - What it sounds like. Various different maps.
- scripts - place for project-related scripts

## Scripts

These are a combo of sheel scripts & AppleScripts with some embedded shell commands.

- ggl2geojson.sh: Download the google spreadsheet and convert it to geojson. This runs every hour via launchctl
- google2geojson.sh: old version of the previous
- json2js.sh: Take the file created by ggl2geojson.sh and copy it into a javascript file that leaflet can use.
- json2csv.sh: Take the file created by ggl2geojson.sh and convert it to csv.
- git_commit.sh: commit various new temple files to github.
- bib2html.sh: Convert automatically generated Zotero temples bib to html
- Get_country_city_info_for_location.applescript
- Get_country_code_for_location.applescript
- Estimate count of DARE items.applescript
- Get_dare_info.applescript
- Pleiades_titles.applescript
- Vici_get_external_IDs.applescript
