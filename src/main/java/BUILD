load("@aspect_bazel_lib//lib:tar.bzl", "tar")

java_binary(
    name = "TravelServer",
    srcs = ["com/github/hblok/cloudtycoon/TravelServer.java"],
    deps = [
       "//proto:travel_java_grpc",
       "//proto:travel_java_proto",
       "@@protobuf~//java/core",
       "@@protobuf~//:protobuf_java_util",
       "@io_grpc_grpc_java//api",
       "@io_grpc_grpc_java//stub",
       "@maven//:io_grpc_grpc_netty_shaded",
       ],
    visibility = ["//src/test/java:__pkg__"]    
)

tar(
    name = "travel_server_layer",
    srcs = [":TravelServer_deploy.jar"],
    visibility = ["//docker:__pkg__"]
)
