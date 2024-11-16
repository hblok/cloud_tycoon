#!/usr/bin/bash

THIS_DIR="$(readlink -f $(dirname $0))"

bash -x $THIS_DIR/../ansible/provision_deploy.sh admin $HOME/.gcp/gcptst.pem
