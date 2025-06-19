#!/bin/bash

rm -rf bin
mkdir bin

rm -rf dist
mkdir dist

npm ci --silent

npm run compile

./node_modules/.bin/pkg ./package.json --targets node22-win-x64 --output bin/geofeed-validator-win-x64 --loglevel=error

./node_modules/.bin/pkg ./package.json --targets node22-linux-x64 --output bin/geofeed-validator-linux-x64 --loglevel=error

./node_modules/.bin/pkg ./package.json --targets node22-macos-x64 --output bin/geofeed-validator-macos-x64 --loglevel=error

echo "--> Geofeed validator compiled in bin/"

