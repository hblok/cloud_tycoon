FROM debian:12

RUN apt-get update; apt-get install -y ansible

RUN ansible-galaxy collection install community.docker
