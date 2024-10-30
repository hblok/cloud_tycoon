#!/usr/bin/python3

import diagrams

from diagrams.oci import compute
from diagrams.oci import connectivity
from diagrams.onprem import container
from diagrams.onprem import network
from diagrams.onprem import client


class AwsDiagram:

    def gen(self, show):
        graph_attr = {
            "fontsize": "20",
            "bgcolor": "transparent"
        }
        
        with diagrams.Diagram(show=show, direction="LR",
                              graph_attr=graph_attr):
            
            with diagrams.Cluster("Docker stack"):
                proxy = connectivity.Backbone("Envoy proxy", height="2")
                proxy >> [
                    compute.Container("Java grpc", height="0.6"),
                    compute.Container("web nginx", height="0.6")]

            client.User(height="0.9") >> proxy


def main():
    AwsDiagram().gen(True)

    
if __name__ == "__main__":
    main()
