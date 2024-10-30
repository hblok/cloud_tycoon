load("@aspect_bazel_lib//lib:tar.bzl", "tar")

java_binary(
    name = "TravelServer",
    srcs = ["com/github/hblok/cloudtycoon/TravelServer.java"],
    visibility = ["//src/test/java:__pkg__"],
    deps = [
        ":AgentService",
        "@io_grpc_grpc_java//api",
        "@maven//:io_grpc_grpc_netty_shaded",
    ],
)

java_library(
    name = "AgentService",
    srcs = ["com/github/hblok/cloudtycoon/AgentService.java"],
    visibility = ["//src/test/java:__pkg__"],
    deps = [
        ":env",
        "//proto:travel_java_grpc",
        "//proto:travel_java_proto",
        "@@protobuf~//:protobuf_java_util",
        "@@protobuf~//java/core",
        "@io_grpc_grpc_java//stub",
    ],
)

java_library(
    name = "env",
    srcs = glob(["com/github/hblok/cloudtycoon/env/*.java"]),
    visibility = ["//src/test/java:__pkg__"],
    deps = [
        "//proto:travel_java_proto",
    ],
)

tar(
    name = "travel_server_layer",
    srcs = [":TravelServer_deploy.jar"],
    visibility = ["//docker:__pkg__"],
)
