#!/bin/sh

## get this dir
BASEDIR=$(dirname "$0")

set -e
export NODE_ENV=local
echo "kdkdkdk"
nodemon --inspect ./publisher-server.js --use-strict/ & nodemon --inspect ./subscriber-server.js --use-strict/
