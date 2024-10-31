py_binary(
    name = "aws_diagram",
    srcs = ["aws_diagram.py"],
    deps = [
        "@pip_diagrams//:pkg",
	"@pip_absl_py//:pkg",
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
