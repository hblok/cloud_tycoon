#!/bin/bash

NAME=$1

kubectl logs -f $(kubectl get pods | grep $NAME | cut -f 1 -d ' ') -c $NAME
