load("@rules_proto_grpc//js:defs.bzl", "js_grpc_web_compile")
load("@io_grpc_grpc_java//:java_grpc_library.bzl", "java_grpc_library")

proto_library(
    name = "travel_proto",
    srcs = ["travel.proto"],
    deps = [
        "@com_google_protobuf//:empty_proto",
	"@com_google_protobuf//:timestamp_proto",
    ]
)

js_grpc_web_compile(
    name = "travel_grpcweb",
    protos = ["travel_proto"],
    verbose = 3,
    visibility = ["//web:__pkg__"],
)

java_proto_library(
     name = "travel_java_proto",
     deps = [":travel_proto"],
     visibility = ["//src:__subpackages__"],
)

java_grpc_library(
    name = "travel_java_grpc",
    srcs = [":travel_proto"],
    deps = [
      ":travel_java_proto",
      # Compatibility issue with older Java versions.
      "@maven//:javax_annotation_javax_annotation_api_1_3_2",
    ],
    visibility = ["//src:__subpackages__"],
)
