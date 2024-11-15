#!/usr/bin/bash

THIS_DIR="$(readlink -f $(dirname $0))"

REMOTE_USER=$1
KEY_FILE=$2

docker run \
       -v $THIS_DIR:/ansible \
       -v $KEY_FILE:/root/ssh_key.pem \
       -v /tmp/inventory:/inventory \
       ansible /usr/bin/ansible-playbook /ansible/provision.yml -vv -i /inventory -e "remote_user=$REMOTE_USER"

docker run \
       -v $THIS_DIR:/ansible \
       -v $THIS_DIR/../../docker/github/docker-compose.yml:/docker-compose.yml \
       -v $HOME/.docker/config.json:/docker_config.json \
       -v $KEY_FILE:/root/ssh_key.pem \
       -v /tmp/inventory:/inventory \
       ansible /usr/bin/ansible-playbook /ansible/deploy.yml -vv -i /inventory -e "remote_user=$REMOTE_USER"

IP=$(cat /tmp/inventory | tail -1)

curl "http://${IP}:12000"
