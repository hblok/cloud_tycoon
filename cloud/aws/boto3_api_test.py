""" Basic API test for the AWS boto3 client.
    Credentials have to be populated under ~/.aws

    See documentation:
    https://boto3.amazonaws.com/v1/documentation/api/latest/guide/quickstart.html
"""

import unittest

import boto3


class Boto3ApiTest(unittest.TestCase):

    def test_resource(self):
        s3 = boto3.resource('s3')
        print("s3: ", s3)

    def test_buckets(self):
        s3 = boto3.resource('s3')
        for bucket in s3.buckets.all():
            print(bucket.name)

    def test_ec2(self):
        ec2 = boto3.resource('ec2')
        for k in ec2.key_pairs.iterator():
            print(k, k.name, k.key_type, k.key_pair_id, k.key_fingerprint)

    def skip_test_create_key_pair(self):
        ec2 = boto3.client('ec2')
        print(ec2.create_key_pair(KeyName='test_key'))

    def test_list_ec2_instances(self):
        ec2 = boto3.resource('ec2')
        for i in ec2.instances.iterator():
            print(i, i.instance_id, i.architecture, i.instance_type,
                  i.public_ip_address, i.state)

    def skip_test_reboot_instance(self):
        ec2 = boto3.client('ec2')
        print(ec2.reboot_instances(InstanceIds=["i-1234567890abcdef5"]))

    def test_cloudformation(self):
        client = boto3.client("cloudformation")
        print(client.list_stacks())
            

if __name__ == "__main__":
    unittest.main()
