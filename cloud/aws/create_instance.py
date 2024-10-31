""" Creates a single EC2 instance. """

import time

import boto3

from absl import app
from absl import flags


DEBIAN_12_AMD64 =  "ami-01427dce5d2537266"

FLAGS = flags.FLAGS
flags.DEFINE_string("ami", DEBIAN_12_AMD64, "AMI Image ID")
flags.DEFINE_string("sg", None, "Security Group ID")
flags.DEFINE_string("key", None, "PEM key name")


class CreateInstance:

    def __init__(self):
        self.client = boto3.client("ec2", region_name="eu-north-1")

    def create(self):
        response = self.client.run_instances(
            BlockDeviceMappings=[
                {
                    "DeviceName": "/dev/xvda",
                    "Ebs": {
                        "DeleteOnTermination": True,
                        "VolumeSize": 8,
                        "VolumeType": "gp3"
                    },
                },
            ],
            ImageId=FLAGS.ami,
            InstanceType="t3.micro",
            MaxCount=1,
            MinCount=1,
            Monitoring={
                "Enabled": False
            },
            SecurityGroupIds=[
                FLAGS.sg,
            ],
            KeyName=FLAGS.key,
        )

        print(response)

        self.instance_id = response["Instances"][0]["InstanceId"]
        print("InstanceId: ", self.instance_id)

        time.sleep(6)

        return self

    def status(self):
        stat = None
        while stat != "running":
            response = self.client.describe_instance_status(InstanceIds=[self.instance_id])
            print(response)
            if response["InstanceStatuses"]:
                stat = response["InstanceStatuses"][0]["InstanceState"]["Name"]
                
            time.sleep(3)

        response = self.client.describe_instances(InstanceIds=[self.instance_id])
        print(response)
        ip = response["Reservations"][0]["Instances"][0]["NetworkInterfaces"][0]["Association"]["PublicIp"]
        print("Public IP: ", ip)

              
def main(_):
    CreateInstance().create().status()

    
if __name__ == "__main__":
    app.run(main)

