load("@aspect_bazel_lib2//lib:tar.bzl", "tar", "mtree_spec", "mtree_mutate")

filegroup(
    name = "static_web",
    srcs = [
        "index.html",
	"main.js",
	"style.css",
	"favicon.ico",
    ] + glob(["gfx/*", "external/*"])	
)

# Makes "local" copies of the grpcweb outputs available so they can be
# easily referenced by the second genrule.
# This is not ideal, and would be unnecessary if this was implemented through
# a custom rule or proper Provider.
genrule(
    name = "copy_travel_grpcweb",
    srcs = ["//proto:travel_grpcweb"],
    outs = [
        "travel_pb.d.ts",
        "travel_grpc_web_pb.d.ts",
        "travel_pb.js",
        "travel_grpc_web_pb.js",
    ],
    cmd = "cp $(SRCS) $(@D)",
)

# A custom call to the rollup "transpiler".
# Again, this is not ideal, and should be avoided.
# Using more modern ts_library and rollup rules from Aspect, or creating
# our own would help with this.
genrule(
    name = "custom_roll",
    srcs = [
        ":rollup.config.js",
        ":agent_grpc.js",
        ":travel_pb.js",
	":travel_grpc_web_pb.js",
	"@npm//google-protobuf",
	"@npm//grpc-web",
	"@npm//@rollup/plugin-commonjs",
    ],
    tools = [
      "@npm//rollup/bin:rollup",
    ],
    outs = [
        "gen/agent_grpc.js",
	"gen/travel_pb.js",
	"gen/travel_grpc_web_pb.js",
	"gen/google-protobuf.js",
	"gen/empty_pb.js",
	"gen/timestamp_pb.js",
	"gen/index.js",
	"gen/helpers.js",
    ],
    cmd = """
	ln -sv bazel-out/k8-fastbuild/bin/external/npm/node_modules

	echo @D: $(@D)
        echo "PWD: $$PWD"
	tree -d -L 5

	$(location @npm//rollup/bin:rollup) \
	  --format es \
	  -p commonjs \
	  --preserveEntrySignatures strict \
	  --config $(location rollup.config.js) \
	  -i $(location :agent_grpc.js) \
	  -i $(location :travel_pb.js) \
	  -i $(location :travel_grpc_web_pb.js) \
	  -i $(location @npm//grpc-web)/index.js \
	  -i $(location @npm//google-protobuf)/google-protobuf.js \
	  -i $(location @npm//google-protobuf)/google/protobuf/empty_pb.js \
	  -i $(location @npm//google-protobuf)/google/protobuf/timestamp_pb.js \
	  -d $(@D)/gen

	# Avoid the random hash in filename of output files. (Luckily, there's only one)
	helpers=$$(basename $(@D)/gen/_commonjsHelpers-*js)
	mv $(@D)/gen/$$helpers $(@D)/gen/helpers.js
	sed -i "s/$$helpers/helpers.js/" $(@D)/gen/*js

	echo "-------------------"
	#tree -L 5 -d
	echo "-------------------"
	tree $(@D)
    """
    )


_WEB_SERVER_DATA = [
    ":static_web",
    ":custom_roll",
    "//web/ui:static_web",
]

mtree_spec(
    name = "mtree",
    srcs = _WEB_SERVER_DATA
)

mtree_mutate(
    name = "add_nginx_path",
    mtree = ":mtree",
    strip_prefix = "web",
    package_dir = "usr/share/nginx/html"
)

tar(
    name = "nginx_web_layer",
    srcs = _WEB_SERVER_DATA,
    mtree = "add_nginx_path",
    visibility = ["//docker:__pkg__"]
)
