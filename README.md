# Temples

Stuff on temples of the Classical world (Greek and Roman and Etruscan, etc)

## List of files

- README.md - This file.
- pleiades\_types.txt - List of the feature types from [Pleiades](http://pleiades.stoa.org). Created from a daily dump of May, 2016.
- DARE\_count.csv - a rough count of items for each DARE type ID, generated by Estimate count of DARE items.applescript in this folder.
- DARE\_Pleiades\_type\_crosswalk.csv - Crosswalk between the DARE and Pleiades types.
- DARE\_type\_ids.csv - List of the item types with their IDs in the Digital Atlas of the  Roman Empire (DARE). Compiled by hand for reference. See the less complete, but official version at <http://dare.ht.lu.se/print.php?doc=info_api>.
- sheet.csv: modified dump from Google sheet
- temples.csv: CSV version of the preceding, with simplified format, intended for import into SQL database.
- temples.json: JSON version of the preceding
- temple\_bib.json: Bibliography in CSL JSON format on such temples from my [Zotero](https://zotero.org/) [library](https://www.zotero.org/john_muccigrosso/items). The bibliography contains citekeys which can be used in place of the full entry in other files and then converted by such things as pandoc.
- temple\_bib.htm: Same as preceding, but in html format.
- bibliography.csv: Same as preceding, but in CSV format, intended for import into SQL database.
- citations.csv: file joining reference citation from the Zotero library to the temple IDs, intended for import into SQL database.
- chicago-author-date.csl - the standard csl for this style, but with citations formatted as biblio. Used to generate simple cite-key:citation pairs for csv.

## List of folders

- downloads - data files from various existing databases (Pleiades, vici.org, DARE)
- forbidden - for storing passwords
- maps - What it sounds like. Various different maps.
- scripts - place for project-related scripts
- htdocs-maps - directory from local MAMP installation. Mirrored by on-line version of <http://RomeResearchGroup.org>

## Scripts

These are a combo of shell scripts & AppleScripts with some embedded shell commands.

- `ggl2geojson.sh`: Download the google spreadsheet and convert it to geojson. This runs every hour via launchctl.
- `ggl2citations.sh`: Download the google spreadsheet and convert it to csv. This runs every hour via launchctl.
- `google2geojson.sh`: old version of the previous
- `json2js.sh`: Take the file created by ggl2geojson.sh and copy it into a javascript file that leaflet can use.
- `json2csv.sh`: Take the file created by ggl2geojson.sh and convert it to csv.
- `git_commit.sh`: commit various new temple files to github.
- `bib2html.sh`: Convert Zotero temples bib to html
- `Get_country_city_info_for_location.applescript`: query Google geo api for city & country info for lat-long pairs
- `Get_country_code_for_location.applescript`: query Google geo api for country info for lat-long pairs
- `Estimate count of DARE items.applescript`: a script to estimate the number of items for each DARE ID. It outputs to DARE\_count.csv in this folder.
- `Get_dare_info.applescript`
- `Pleiades_titles.applescript`
- `Vici_get_external_IDs.applescript`

## External scripts

- **Leaflet** is a local copy of the mapping [javascript library](http://leafletjs.com/download.html).
- **jquery** is also a local copy installed via npm.

## How it works

### Maintaining the data

- The data on temples (and other structures) as well as citations for each structure are maintained in a Google sheet. This is mainly for convenience and will likely not be a long-term solution.
- Periodically scripts run on my laptop to download the data and convert it to more useful forms than the XML it arrives as. Use `launchctl` to schedule these.
    - `ggl2geojson.sh` does this every hour:
        1. Download the temples sheet of the spreadsheet as xml
        1. Convert that to csv
        1. Save it if it differs from the last saved csv
        1. Also save a json version of the same data
    - `json2js.sh` runs whenever the json file changes:
        1. Convert json file to js for leaflet.js to use
    - `json2csv.sh` runs whenever the json file changes:
        1. Convert json file to nice csv for the database to use
    - `ggl2cites.sh` does this every hour:
        1. Download the citations sheet of the spreadsheet as xml
        1. Convert that to csv
        1. Save it if it differs from the last saved csv
    - `git_commit.sh` runs whenever temples.js changes
        1. Commits to git any changed files from the google sheet csv with a generic commit message
        1. Does **not** commit any of the temple files so that these can get informative commit messages

### Bibliography

- The bibliography for the project is kept in my [Zotero](http://zotero.org/) library.
- This collection is manually exported to this github folder. (Used to be automatic, but Zotero can't do that anymore.)
    - `bib2html.sh` runs whenever the Zotero json export of temple bibliography changes
        1. Convert the json to plain text and html via pandoc-citeproc
        1. Combine the two versions into csv
    - `git_commit.sh` runs whenever temple_bib.json changes
        1. Commits to git any changed files with a generic commit message

### The Working Database

- The data are transferred into a mysql database to be served on line. This is done by directly importing the csv files mentioned above via phpAdmin.
- A local mysql/apache server is maintained via [MAMP](http://mamp.info/) for testing.

### Maps

- Maps are created using [Leaflet](http://leafletjs.com) by querying the database directly (either locally or on-line).
- The map itself is handled through a drop-down menu that calls the scripts to load, clear, and re-load the map and its controls.
- The data are called via php from the server sql database and turned into geojson for leaflet.
