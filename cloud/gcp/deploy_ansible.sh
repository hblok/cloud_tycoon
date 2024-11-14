#!/usr/bin/bash

THIS_DIR="$(readlink -f $(dirname $0))"

docker run \
       -v $THIS_DIR/deploy.yml:/deploy.yml \
       -v $THIS_DIR/../../docker/github/docker-compose.yml:/docker-compose.yml \
       -v $HOME/.docker/config.json:/docker_config.json \
       -v $HOME/.gcp/gcptst.pem:/root/ssh_key.pem \
       -v /tmp/inventory:/inventory \
       ansible /usr/bin/ansible-playbook /deploy.yml -vv -i /inventory

IP=$(cat /tmp/inventory | tail -1)

curl "http://${IP}:12000"
