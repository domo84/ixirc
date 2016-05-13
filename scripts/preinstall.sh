#!/usr/bin/env bash

bin=$(pwd)/node_modules/.bin/babel-node
out="bin/cli.js"

echo "#!$bin" > $out
echo "require(\"./ixirc.js\");" >> $out

chmod +x $out
