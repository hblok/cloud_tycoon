
java_test(
    name = "AgentServiceTest",
    srcs = ["com/github/hblok/cloudtycoon/AgentServiceTest.java"],
    deps = [
        "//proto:travel_java_proto",
        "//src/main/java:AgentService",
        "@io_grpc_grpc_java//stub",	
        "@maven//:org_easymock_easymock",
    ],
    size = "small",
)

java_test(
    name = "TravelServerTest",
    srcs = ["com/github/hblok/cloudtycoon/TravelServerTest.java"],
    deps = [
        "//src/main/java:TravelServer"
    ],
    size = "small",
)
