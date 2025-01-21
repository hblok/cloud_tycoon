# https://docs.aws.amazon.com/eks/latest/userguide/create-managed-node-group.html

eksctl create nodegroup \
  --cluster travel_kube \
  --region eu-north-1 \
  --name travel-mng \
  --node-ami-family AmazonLinux2023 \
  --node-type t3.micro \
  --nodes 3 \
  --nodes-min 2 \
  --nodes-max 4 \
  --ssh-access \
  --ssh-public-key travel_tycoon_v1_api
