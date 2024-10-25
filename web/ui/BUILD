load(":mocha_test.bzl", "mocha_test")

filegroup(
  name = "static_web",
  srcs = glob(["*.js", "*.html"]),
  visibility = ["//web:__pkg__"],
)

sh_binary(
  name = "mocha",
  srcs = ["mocha.sh"],
)

# TODO

# mocha_test(
#   name = "citymenu_test",
#   srcs = ["citymenu_test.js"],
# )

# mocha_test(
#   name = "menu_test",
#   srcs = ["menu_test.js"],
# #  deps = ["@npm//:node_modules/jsdom"],
# )

# mocha_test(
#   name = "svg_api_test",
#   srcs = ["svg_api_test.js"],
# )
