#!/usr/bin/bash

THIS_DIR="$(readlink -f $(dirname $0))"

cd $THIS_DIR
docker build --tag ansible .
./ansible --version

