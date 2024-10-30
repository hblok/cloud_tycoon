load("@aspect_bazel_lib2//lib:tar.bzl", "mtree_mutate", "mtree_spec", "tar")

_TAR_SRCS = ["envoy.yaml"]

mtree_spec(
    name = "mtree",
    srcs = _TAR_SRCS,
)

mtree_mutate(
    name = "add_path",
    mtree = ":mtree",
    package_dir = "etc/envoy",
    strip_prefix = "proxy",
)

tar(
    name = "envoy_proxy_layer",
    srcs = _TAR_SRCS,
    mtree = "add_path",
    visibility = ["//docker:__pkg__"],
)
