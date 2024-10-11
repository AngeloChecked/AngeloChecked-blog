resource "aws_s3_bucket" "website_bucket" {
  bucket        = var.website_bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_policy" "account_policy" {
  bucket = aws_s3_bucket.website_bucket.id
  policy = data.aws_iam_policy_document.website_policy.json
}

resource "aws_s3_bucket_acl" "bucket_visibility" {
  bucket = aws_s3_bucket.website_bucket.id
  acl    = "private"
}

resource "aws_s3_bucket_versioning" "no_versioning" {
  bucket = aws_s3_bucket.website_bucket.id
  versioning_configuration {
    status = "Suspended"
  }
}

resource "aws_s3_bucket_website_configuration" "bucket_configuration" {
  bucket = aws_s3_bucket.website_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }

}


data "aws_canonical_user_id" "current" {}

resource "aws_s3_bucket" "website_logging_bucket" {
  bucket = var.website_logging_bucket_name

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_public_access_block" "website_logging_bucket_access_block" {
  bucket = aws_s3_bucket.website_logging_bucket.bucket

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_ownership_controls" "ownership_controls_config_bucket" {
  bucket = aws_s3_bucket.website_logging_bucket.bucket

  rule {
    object_ownership = "ObjectWriter"
  }
}

resource "aws_s3_bucket_acl" "website_logging_bucket_acl" {
  bucket = aws_s3_bucket.website_logging_bucket.bucket

  access_control_policy {
    owner {
      id = data.aws_canonical_user_id.current.id
    }

    grant {
      grantee {
        id   = data.aws_canonical_user_id.current.id
        type = "CanonicalUser"
      }
      permission = "FULL_CONTROL"
    }

    grant {
      # Grant CloudFront logs access to your Amazon S3 Bucket
      # https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html#AccessLogsBucketAndFileOwnership
      grantee {
        id   = "c4c1ede66af53448b93c283ce9448c4ba468c9432aa01d700d3878632f77d2d0"
        type = "CanonicalUser"
      }
      permission = "FULL_CONTROL"
    }
  }
}

resource "aws_s3_bucket_versioning" "website_logging_bucket_no_versioning" {
  bucket = aws_s3_bucket.website_logging_bucket.bucket
  versioning_configuration {
    status = "Suspended"
  }
}

locals {
  s3_origin_id = var.website_bucket_name
}
