load(":custom_mocha_test.bzl", "mocha_test")

filegroup(
    name = "static_web",
    srcs = [
        "citymenu.js",
        "info_table.html",
        "main.js",
        "menu.js",
        "svg_map.js",
    ],
    visibility = ["//web:__pkg__"],
)

TEST_DEPS = [
    "package.json",
    "mock_jdom.js",
    "mock_svg.js",
    "@npm//assert",
    "@npm//jsdom",
    "@npm//jquery",
    "@npm//@svgdotjs/svg.js",
]

mocha_test(
    name = "menu_test",
    srcs = ["menu.js"] + TEST_DEPS,
)

mocha_test(
    name = "citymenu_test",
    srcs = [
        "citymenu.js",
        "menu.js",
    ] + TEST_DEPS,
)

mocha_test(
    name = "svg_api_test",
    srcs = TEST_DEPS,
)
