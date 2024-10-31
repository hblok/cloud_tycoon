#!/usr/bin/python3

from absl import app
from absl import flags
from diagrams.aws.compute import EC2
from diagrams.aws.compute import EC2Instance
from diagrams.oci.compute import Container
from diagrams.oci import connectivity
from diagrams.onprem import client
from diagrams.onprem import container
from diagrams.onprem import network
import diagrams


FLAGS = flags.FLAGS
flags.DEFINE_enum("d", None, ["docker", "aws"], "Diagram to generate")


class AwsDiagram:

    def __init__(self, show):
        self.show = show

    def docker(self):
        graph_attr = {
            "fontsize": "20",
            "bgcolor": "transparent"
        }
        
        with diagrams.Diagram(show=self.show, direction="LR",
                              graph_attr=graph_attr):
            
            with diagrams.Cluster("Docker stack"):
                proxy = connectivity.Backbone("Envoy proxy", height="2")
                proxy >> [
                    Container("Java grpc", height="1.75"),
                    Container("web nginx", height="1.75")]

            client.User(height="0.9") >> proxy

    def aws(self):
        graph_attr = {
            "fontsize": "20",
            "bgcolor": "transparent"
        }
        
        with diagrams.Diagram(show=self.show, direction="LR",
                              graph_attr=graph_attr):
            
            with diagrams.Cluster("Docker stack"):
                proxy = connectivity.Backbone("Envoy proxy", height="2")
                proxy >> [
                    Container("Java grpc", height="1.75"),
                    Container("web nginx", height="1.75")]
                EC2(height="0.5")



def main(_):
    ad = AwsDiagram(True)
    getattr(ad, FLAGS.d)()

    
if __name__ == "__main__":
    app.run(main)
