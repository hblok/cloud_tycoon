load("@npm//mocha:index.bzl", _aspect_mocha_test = "mocha_test")

# Overrides the Aspect mocha_test rule to cater for our tests.
# First, the target name is always the same as the _test.js file.
# Second, notice the web/ui directory in the module_path, which is this package.
# Finally, all our Mocha tests are Test Driven (TDD)

def mocha_test(name, srcs=[]):
    test_module = "%s.js" % name
    module_path = "web/ui/%s" % test_module

    _aspect_mocha_test(
        name = name,
        args = ["-u", "tdd", module_path],
        data = srcs + [
     	    test_module,
   	],
	size = "small",
)
