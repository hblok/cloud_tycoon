import unittest

from doc import aws_diagram


class AwsDiagramTest(unittest.TestCase):

    def test_docker(self):
        aws_diagram.AwsDiagram(False).docker()


if __name__ == "__main__":
    unittest.main()
