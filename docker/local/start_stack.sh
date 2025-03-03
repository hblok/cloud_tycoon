#!/bin/bash

bazel run //docker:load_envoy_proxy_native_registry
bazel run //docker:load_nginx_web_native_registry
bazel run //docker:load_travel_server_native_registry

#docker compose up
docker-compose up -d

