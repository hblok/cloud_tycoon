#!/usr/bin/bash

THIS_DIR="$(readlink -f $(dirname $0))"

bash -x $THIS_DIR/../ansible/provision_deploy.sh tst $HOME/.azure/azure_tst.pem

