#!/usr/bin/bash

THIS_DIR="$(readlink -f $(dirname $0))"

docker run \
       -v $THIS_DIR/provision.yml:/provision.yml \
       -v /tmp/inventory:/inventory \
       -v $HOME/.aws/ec2_instance.pem:/root/aws_key.pem \
       ansible /usr/bin/ansible-playbook /provision.yml -vv -i /inventory
