#!/usr/bin/python3

import unittest

import diagrams
from diagrams.aws import compute
from diagrams.aws import database
from diagrams.aws import network


class DiagramApiTest(unittest.TestCase):

    def test_diagrams(self):
        with diagrams.Diagram("Web Service", show=False):
            network.ELB("lb") >> compute.EC2("web") >> database.RDS("userdb")


if __name__ == "__main__":
  unittest.main()
