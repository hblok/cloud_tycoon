load("@aspect_bazel_lib2//lib:tar.bzl", "tar", "mtree_spec", "mtree_mutate")

_TAR_SRCS = ["envoy.yaml"]

mtree_spec(
    name = "mtree",
    srcs = _TAR_SRCS,
)

mtree_mutate(
    name = "add_path",
    mtree = ":mtree",
    strip_prefix = "proxy",
    package_dir = "etc/envoy"
)

tar(
    name = "envoy_proxy_layer",
    srcs = _TAR_SRCS,
    mtree = "add_path",
    visibility = ["//docker:__pkg__"]
)
