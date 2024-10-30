py_binary(
    name = "aws_diagram",
    srcs = ["aws_diagram.py"],
    deps = [
        "@pip_diagrams//:pkg",
    ],
)

py_test(
    name = "aws_diagram_test",
    size = "small",
    srcs = ["aws_diagram_test.py"],
    deps = [
        ":aws_diagram",
    ],
)

py_test(
    name = "diagram_api_test",
    size = "small",
    srcs = ["diagram_api_test.py"],
    deps = [
        "@pip_diagrams//:pkg",
    ],
)
