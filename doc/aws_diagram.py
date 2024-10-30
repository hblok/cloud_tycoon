#!/usr/bin/python3

import diagrams

from diagrams.oci import compute
from diagrams.oci import connectivity
from diagrams.onprem import container
from diagrams.onprem import network
from diagrams.onprem import client


class AwsDiagram:

    def gen(self, show):
        with diagrams.Diagram(show=show, direction="TB"):
            
            with diagrams.Cluster("Docker stack"):
                proxy = connectivity.Backbone("Envoy proxy")
                proxy >> [
                    compute.Container("Java grpc"),
                    compute.Container("web nginx")]

            client.User() >> proxy


def main():
    AwsDiagram().gen(True)

    
if __name__ == "__main__":
    main()
