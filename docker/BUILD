load(":variables.bzl", "TAGS")
load("@rules_multirun//:defs.bzl", "command", "multirun")
load("@rules_oci//oci:defs.bzl", "oci_image", "oci_load", "oci_push")

## TravelServer (gRPC server)

oci_image(
    name = "travel_server_image",
    base = "@distroless_java",
    entrypoint = [
        "/usr/bin/java",
        "-jar",
        "/src/main/java/TravelServer_deploy.jar",
    ],
    tars = ["//src/main/java:travel_server_layer"],
)

oci_load(
    name = "load_travel_server_native_registry",
    image = ":travel_server_image",
    repo_tags = ["travel_server:latest"],
)

oci_push(
    name = "push_travel_server_github",
    image = ":travel_server_image",
    remote_tags = ["latest"],
    repository = "ghcr.io/hblok/ct_travel_server",
)

## Nginx web server

oci_image(
    name = "nginx_web_image",
    base = "@nginx_mainline",
    tars = ["//web:nginx_web_layer"],
)

oci_load(
    name = "load_nginx_web_native_registry",
    image = ":nginx_web_image",
    repo_tags = ["nginx_web:" + TAGS["nginx_web_tag"]],
)

oci_push(
    name = "push_nginx_web_github",
    image = ":nginx_web_image",
    remote_tags = [TAGS["nginx_web_tag"], "latest"],
    repository = "ghcr.io/hblok/ct_nginx_web",
)

## Envoy proxy

oci_image(
    name = "envoy_proxy_image",
    base = "@envoyproxy_distroless",
    tars = ["//proxy:envoy_proxy_layer"],
)

oci_load(
    name = "load_envoy_proxy_native_registry",
    image = ":envoy_proxy_image",
    repo_tags = ["envoy_distroless:v1.32"],
)

oci_push(
    name = "push_envoy_proxy_github",
    image = ":envoy_proxy_image",
    remote_tags = ["v1.32"],
    repository = "ghcr.io/hblok/ct_envoy_distroless",
)

## Push all Github

multirun(
    name = "push_all_github",
    commands = [
        "push_travel_server_github",
        "push_nginx_web_github",
        "push_envoy_proxy_github",
    ],
)
