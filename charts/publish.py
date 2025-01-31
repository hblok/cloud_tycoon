#!/usr/bin/python3

import copy
import datetime
import json
import subprocess
import yaml
import pathlib


HELM_VALUES = "charts/cloud-tycoon/values.yaml"
HELM_INDEX = "github_pages/index.yaml"


class Release:

    def __init__(self, nginx_web_version):
        self.nginx_web_version = nginx_web_version
        
        self.git_root = self._find_base_path()

    def _find_base_path(self):
        cur = pathlib.Path().absolute()
        while len(str(cur)) > 3:
            if (cur / "WORKSPACE").exists():
                return cur.absolute()
            cur = cur.parent

        raise FileNotFoundError("WORKSPACE file not found")

    def read(self):
        self._pretty_json(self.read_repo_values())
        self._pretty_json(self.read_repo_index())
        
    def read_repo_values(self):
        return self._read_yaml(self.git_root / HELM_VALUES)

    def read_repo_index(self):
        return self._read_yaml(self.git_root / HELM_INDEX)

    def update(self):
        self.update_repo_values()
        #self.update_repo_index()
        self.update_docker()
        self.tar_gz()

    def update_repo_values(self):
        path = self.git_root / HELM_VALUES
        
        values = self._read_yaml(path)
        values["nginx_web_version"] = self.nginx_web_version
        self._write_yml(values, path)

    def update_repo_index(self):
        path = self.git_root / HELM_INDEX
        
        data = self._read_yaml(path)
        entries = data["entries"]["cloud-tycoon"]

        new = copy.deepcopy(entries[0])
        new["created"] = datetime.datetime.now()
        new["version"] = f"v{self.nginx_web_version}"
        new["urls"][0] = f"cloud-tycoon-{self.nginx_web_version}.tgz"
        entries.append(new)

        self._pretty_json(data)

        self._write_yml(data, path)

    def update_docker(self):
        path = self.git_root / "docker/variables.bzl"
        
        with open(path) as f:
            s = f.read()
            #print(s)
            l = {}
            exec(s, {}, l)
            #print(l["TAGS"])
            TAGS = l["TAGS"]

        TAGS["nginx_web_tag"] = f"v{self.nginx_web_version}"

        with open(path, "w") as f:
            f.write("TAGS = " + str(TAGS) + "\n")

    def tar_gz(self):
        tar_file = self.git_root / f"github_pages/cloud-tycoon-{self.nginx_web_version}.tgz"
        subprocess.check_call(["tar", "zcvf", tar_file, "cloud-tycoon"], cwd=self.git_root / "charts")

    def _pretty_json(self, data):
        print("\n", "- " * 40)
        print(json.dumps(data, indent=2, default=str))
        print("\n", "- " * 40)

    def _read_yaml(self, path):
        with open(path) as f:
            return yaml.safe_load(f)

    def _write_yml(self, data, path):
        with open(path, "w") as f:
            yaml.dump(data, f)
    

def main():
    #Release("v0.1.9").read()
    Release("0.1.9").update()


if __name__ == "__main__":
    main()
