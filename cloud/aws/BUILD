py_binary(
    name = "create_instance",
    srcs = ["create_instance.py"],
    deps = [
        "@pip_absl_py//:pkg",
        "@pip_boto3//:pkg",
    ],
)

py_test(
    name = "boto3_api_test",
    size = "small",
    srcs = ["boto3_api_test.py"],
    tags = ["manual"],
    deps = ["@pip_boto3//:pkg"],
)
