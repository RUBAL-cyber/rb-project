##########################################################
# Step 3 — Encryption for RB Visual Store
# Includes:
# 1. S3 Bucket Encryption
# 2. EBS Volume Encryption
# 3. RDS Database Encryption with 2 private subnets
##########################################################

# 1️⃣ Random ID for unique S3 bucket name
resource "random_id" "app_bucket_id" {
  byte_length = 4
}

# 2️⃣ S3 Bucket
resource "aws_s3_bucket" "app_bucket" {
  bucket = "rb-app-bucket-${random_id.app_bucket_id.hex}"

  tags = {
    Name = "rb-app-s3"
  }
}

# 2️⃣a S3 Server-Side Encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "app_bucket_enc" {
  bucket = aws_s3_bucket.app_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# 3️⃣ EBS Volume Encryption
resource "aws_ebs_volume" "app_volume" {
  availability_zone = "us-east-1a"
  size              = 8
  encrypted         = true

  tags = {
    Name = "rb-app-ebs"
  }
}

# 4️⃣ Private Subnets (non-conflicting)
resource "aws_subnet" "private_1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.3.0/24"  # new, non-conflicting
  availability_zone       = "us-east-1f"
  map_public_ip_on_launch = false

  tags = { Name = "rb-private-subnet-1" }
}

resource "aws_subnet" "private_2" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.4.0/24"  # new, non-conflicting
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = false

  tags = { Name = "rb-private-subnet-2" }
}

# 5️⃣ RDS Subnet Group covering 2 AZs
resource "aws_db_subnet_group" "app_subnet" {
  name       = "rb-app-db-subnet-group"
  subnet_ids = [
    aws_subnet.private_1.id,
    aws_subnet.private_2.id
  ]

  tags = { Name = "rb-app-db-subnet-group" }
}

# 6️⃣ RDS Database Instance
resource "aws_db_instance" "app_db" {
  allocated_storage      = 20
  engine                 = "mysql"
  engine_version         = "8.0"
  instance_class         = "db.t3.micro"
  username               = "admin"
  password               = "YourPassword123!" # Replace with a strong password
  db_subnet_group_name   = aws_db_subnet_group.app_subnet.name
  vpc_security_group_ids = [aws_security_group.web_sg.id]

  storage_encrypted     = true
  publicly_accessible   = false

  tags = { Name = "rb-app-db" }
}