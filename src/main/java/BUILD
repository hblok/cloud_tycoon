load("@aspect_bazel_lib//lib:tar.bzl", "tar")

java_binary(
    name = "TravelServer",
    srcs = ["com/github/hblok/cloudtycoon/TravelServer.java"],
    deps = [
       ":AgentService",
       "@io_grpc_grpc_java//api",
       "@maven//:io_grpc_grpc_netty_shaded",
       ],
    visibility = ["//src/test/java:__pkg__"]    
)

java_library(
    name = "AgentService",
    srcs = ["com/github/hblok/cloudtycoon/AgentService.java"],
    deps = [
       ":env",
       "//proto:travel_java_grpc",
       "//proto:travel_java_proto",
       "@io_grpc_grpc_java//stub",
       "@@protobuf~//java/core",
       "@@protobuf~//:protobuf_java_util",
    ],
    visibility = ["//src/test/java:__pkg__"]
)

java_library(
    name = "env",
    srcs = glob(["com/github/hblok/cloudtycoon/env/*.java"]),
    deps = [
       "//proto:travel_java_proto",
    ],
    visibility = ["//src/test/java:__pkg__"]
)

tar(
    name = "travel_server_layer",
    srcs = [":TravelServer_deploy.jar"],
    visibility = ["//docker:__pkg__"]
)
