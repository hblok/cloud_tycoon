#!/usr/bin/python3

import yaml


class Release:

    def __init__(self, nginx_web_version):
        self.nginx_web_version = nginx_web_version

    def read(self):
        print(self.read_repo_values())
        
    def read_repo_values(self):
        return self._read_yaml("charts/cloud-tycoon/values.yaml")

    def update_repo_values(self):
        path = "charts/cloud-tycoon/values.yaml"
        
        values = self._read_yaml(path)
        values["nginx_web_version"] = self.nginx_web_version
        self._write_yml(values, path)

    def _read_yaml(self, path):
        with open(path) as f:
            return yaml.safe_load(f)

    def _write_yml(self, data, path):
        with open(path) as f:
            yaml.dump(data, f)
    

def main():
    Release("v0.1.9").read()


if __name__ == "__main__":
    main()
