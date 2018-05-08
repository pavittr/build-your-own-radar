#!/bin/bash -ex

npm install
npm run build
cp _blips/data.json dist/data.json