#!/bin/bash

# Converts Zotero-produced json bib file into html

# Set up some variables
me=$(whoami)
dest="/Users/$me/Documents/github/local/temples"
temp=$(echo $TMPDIR | sed 's:/$::')

# Path to include homebrew stuff like pandoc for running via launchctl
export PATH="/usr/local/bin:$PATH"

# Convert the json file to yaml for pandoc-citeproc.
pandoc-citeproc -y "$dest/temple_bib.json" > "$temp/refs.txt"  2> "$temp/error.txt"
 # | perl -p -MPOSIX -e 'BEGIN {$|=1} $_ = strftime("%Y-%m-%d %T ", localtime) . $_')
if [ $? -ne 0 ]
	then
	echo "$(date +%Y-%m-%d\ %H:%M:%S): $(cat $temp/error.txt)" 1>&2
	exit
fi

if [ $(stat -f %z $temp/refs.txt) -eq 0 ]
	then
	echo "$(date +%Y-%m-%d\ %H:%M:%S): No references generated by pandoc-citeproc" 1>&2
	exit
fi

# Add the 'nocite' metadata field & send them to pandoc for conversion to an HTML file
echo "$(cat $temp/refs.txt)
---
nocite: |
  '@*'
...
" | pandoc --filter pandoc-citeproc -s -o "$dest/temple_bib.html"
