load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")


## Aspect

http_archive(
    name = "aspect_bazel_lib2",
    sha256 = "a272d79bb0ac6b6965aa199b1f84333413452e87f043b53eca7f347a23a478e8",
    strip_prefix = "bazel-lib-2.9.3",
    url = "https://github.com/bazel-contrib/bazel-lib/releases/download/v2.9.3/bazel-lib-v2.9.3.tar.gz",
)

load("@aspect_bazel_lib2//lib:repositories.bzl", "aspect_bazel_lib_dependencies", "aspect_bazel_lib_register_toolchains")
aspect_bazel_lib_dependencies()
aspect_bazel_lib_register_toolchains()


## Multirun

http_archive(
    name = "rules_multirun",
    sha256 = "0e124567fa85287874eff33a791c3bbdcc5343329a56faa828ef624380d4607c",
    url = "https://github.com/keith/rules_multirun/releases/download/0.9.0/rules_multirun.0.9.0.tar.gz",
)


## GRPC

proto_grpc_version = "4.6.0"

http_archive(
    name = "rules_proto_grpc",
    urls = ["https://github.com/rules-proto-grpc/rules_proto_grpc/archive/refs/tags/%s.tar.gz" % (
        proto_grpc_version)],
    strip_prefix = "rules_proto_grpc-%s" % proto_grpc_version,
    sha256 = "c0d718f4d892c524025504e67a5bfe83360b3a982e654bc71fed7514eb8ac8ad",
)   


load("@rules_proto_grpc//:repositories.bzl", "rules_proto_grpc_repos", "rules_proto_grpc_toolchains")
rules_proto_grpc_toolchains()
rules_proto_grpc_repos()


load("@rules_proto_grpc//js:repositories.bzl", rules_proto_grpc_js_repos = "js_repos")
rules_proto_grpc_js_repos()


## NodeJS, Yarn (NPM)

load("@build_bazel_rules_nodejs//:repositories.bzl", "build_bazel_rules_nodejs_dependencies")

build_bazel_rules_nodejs_dependencies()

load("@build_bazel_rules_nodejs//:index.bzl", "yarn_install")

yarn_install(
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)




## Java, Maven

RULES_JVM_EXTERNAL_TAG = "6.4"
http_archive(
    name = "rules_jvm_external",
    strip_prefix = "rules_jvm_external-%s" % RULES_JVM_EXTERNAL_TAG,
    sha256 = "8c92f7c7a57273c692da459f70bd72464c87442e86b9e0b495950a7c554c254f",
    url = "https://github.com/bazelbuild/rules_jvm_external/archive/%s.zip" % RULES_JVM_EXTERNAL_TAG,
)

load("@rules_jvm_external//:repositories.bzl", "rules_jvm_external_deps")
rules_jvm_external_deps()

load("@rules_jvm_external//:setup.bzl", "rules_jvm_external_setup")
rules_jvm_external_setup()

load("@rules_jvm_external//:defs.bzl", "maven_install")

maven_install(
artifacts = [
	"com.google.api.grpc:proto-google-common-protos:2.46.0",
	"com.google.guava:guava:33.3.1-jre",
	"com.google.protobuf:protobuf-java:4.28.2",
	"io.grpc:grpc-api:1.68.0",
	"io.grpc:grpc-netty-shaded:1.68.0",
        "javax.annotation:javax.annotation-api:1.3.2",
        "org.apache.tomcat:annotations-api:6.0.13",

    ],
    repositories = [
        "https://maven.google.com",
        "https://repo1.maven.org/maven2",
    ],
)

grpc_java_version = "1.67.1"
http_archive(
    name = "io_grpc_grpc_java",
    urls = ["https://github.com/grpc/grpc-java/archive/v%s.tar.gz" % grpc_java_version],
    strip_prefix = "grpc-java-" + grpc_java_version,
    integrity = "sha256-dNPOEqDnirIwWBr3A++3hSL2d8+x9Q3Z57cNRqgY9f8="
)


## Pip / Python

rules_python_version = "0.37.1"
http_archive(
    name = "rules_python",
    sha256 = "bd4797821b72b80b69e3c5ab4ad037e7fd1e6a0a27aebf42424c7ab0ce32e254",
    strip_prefix = "rules_python-{}".format(rules_python_version),
    url = "https://github.com/bazelbuild/rules_python/archive/refs/tags/{}.tar.gz".format(rules_python_version),
)

load("@rules_python//python:repositories.bzl", "python_register_toolchains")
python_register_toolchains(
    name = "python3_10",
    python_version = "3.10",
)

load("@rules_python//python:pip.bzl", "pip_parse")

pip_parse(
    name = "pip",
    requirements_lock = "//:requirements_lock.txt",
)

load("@pip//:requirements.bzl", "install_deps")
install_deps()


# Docker

http_archive(
    name = "rules_oci",
    sha256 = "acbf8f40e062f707f8754e914dcb0013803c6e5e3679d3e05b571a9f5c7e0b43",
    strip_prefix = "rules_oci-2.0.1",
    url = "https://github.com/bazel-contrib/rules_oci/releases/download/v2.0.1/rules_oci-v2.0.1.tar.gz",
)

load("@rules_oci//oci:dependencies.bzl", "rules_oci_dependencies")
rules_oci_dependencies()

load("@rules_oci//oci:repositories.bzl", "oci_register_toolchains")
oci_register_toolchains(name = "oci")

load("@rules_oci//oci:pull.bzl", "oci_pull")

oci_pull(
    name = "distroless_java",
    image = "gcr.io/distroless/java21:debug-nonroot",
    digest = "sha256:2749f6b4d246dc557b7e4b1c5af93fd87ba90ebebcf2afdb649cac8ea63f032b",
    platforms = [
        "linux/amd64",
    ],
)

oci_pull(
    name = "envoyproxy_distroless",
    registry = "index.docker.io",
    repository = "envoyproxy/envoy",
    tag = "distroless-v1.32-latest",
    digest = "sha256:d330030de91cd18f202e9bd941c81aab0fc69e8995c43bc7f3f55ba4ee6fc949",
    platforms = [
        "linux/amd64",
    ],
)

oci_pull(
    name = "nginx_mainline",
    registry = "index.docker.io",
    repository = "library/nginx",
    tag = "mainline",
    digest = "sha256:28402db69fec7c17e179ea87882667f1e054391138f77ffaf0c3eb388efc3ffb",
    platforms = [
        "linux/amd64",
    ],
)
