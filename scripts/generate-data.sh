#!/bin/bash -e

# Script requires:
# jq https://stedolan.github.io/jq/download/
# cvs2json (npm install -g d3-dsv)

DATAFILE=data.csv
OUTPUT_FOLDER=_blips
mkdir $OUTPUT_FOLDER || true
JSON_DATA=`csv2json $DATAFILE `

IFS=$'\n' 
QUADRANTS=`echo $JSON_DATA | jq -r -c '[.[].quadrant] | unique | .[]'`
for SELECTED_QUADRANT in $QUADRANTS;
do
  echo Processing Quadrant $SELECTED_QUADRANT
  echo ======================================
  URL_ENCODED_QUADRANT=`echo "{\"e\": \"$SELECTED_QUADRANT\"}" | jq -r '.e | @uri'`
  mkdir $OUTPUT_FOLDER/$URL_ENCODED_QUADRANT || true
  for name in `echo $JSON_DATA | jq  -r ".[] | select(.quadrant == \"$SELECTED_QUADRANT\") | .name "`;
  do
    echo Processing $name
    OBJ=`echo $JSON_DATA | jq --arg name "$name" '.[] | select(.name == $name)'`
    URL_ENCODED_NAME=`echo $OBJ | jq -r '.name | @uri'`
    RING=`echo $OBJ | jq -r .ring`
    QUADRANT=`echo $OBJ | jq -r .quadrant`
    CAPABILITY=`echo $OBJ | jq -r .capability`
    DESC=`echo $OBJ | jq -r .description`
    cat <<EOF  > $OUTPUT_FOLDER/$URL_ENCODED_QUADRANT/$URL_ENCODED_NAME.md
---
name: $name
ring: $RING
quadrant: $QUADRANT
capability: $CAPABILITY
---
# $name

$DESC
EOF
  
  done
  echo ""
done

