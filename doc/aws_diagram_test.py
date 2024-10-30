import unittest

from doc import aws_diagram


class AwsDiagramTest(unittest.TestCase):

    def test_gen(self):
        aws_diagram.AwsDiagram().gen(False)


if __name__ == "__main__":
    unittest.main()
