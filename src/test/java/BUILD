java_test(
    name = "AgentServiceTest",
    size = "small",
    srcs = ["com/github/hblok/cloudtycoon/AgentServiceTest.java"],
    deps = [
        "//proto:travel_java_proto",
        "//src/main/java:AgentService",
        "@io_grpc_grpc_java//stub",
        "@maven//:org_easymock_easymock",
    ],
)

java_test(
    name = "TravelServerTest",
    size = "small",
    srcs = ["com/github/hblok/cloudtycoon/TravelServerTest.java"],
    deps = [
        "//src/main/java:TravelServer",
    ],
)

java_test(
    name = "CloudInfoTest",
    size = "small",
    srcs = ["com/github/hblok/cloudtycoon/env/CloudInfoTest.java"],
    deps = [
        "//src/main/java:env",
    ],
)

java_test(
    name = "ExternalIpTest",
    size = "small",
    srcs = ["com/github/hblok/cloudtycoon/env/ExternalIpTest.java"],
    deps = [
        "//src/main/java:env",
    ],
)

java_test(
    name = "SystemInfoTest",
    size = "small",
    srcs = ["com/github/hblok/cloudtycoon/env/SystemInfoTest.java"],
    deps = [
        "//src/main/java:env",
    ],
)
