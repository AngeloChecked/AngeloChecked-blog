#resource "aws_s3_bucket" "website_bucket" {
#  bucket = var.domain_name
#  acl = "public-read"
#  policy = data.aws_iam_policy_document.website_policy.json
#  website {
#    index_document = "index.html"
#    error_document = "index.html"
#  }
#}

# potentially `policy = file("s3-policy.json")`
resource "aws_s3_bucket" "website_bucket" {
  bucket = var.website_bucket_name
  acl    = "private"
  policy = data.aws_iam_policy_document.website_policy.json

  versioning {
    enabled = false
  }

  website {
    index_document = "index.html"
    error_document = "404.html"
  }

#  routing_rules = <<EOF
#                    [{
#                        "Condition": {
#                            "KeyPrefixEquals": "docs/"
#                        },
#                        "Redirect": {
#                            "ReplaceKeyPrefixWith": "documents/"
#                        }
#                    }]
#                    EOF
#
  force_destroy = true
}

# resource "aws_s3_bucket_policy" "mybucket" {
#  bucket = aws_s3_bucket.website_bucket.id
#  policy = data.aws_iam_policy_document.website_policy.json
#}

#resource "aws_s3_bucket_public_access_block" "mybucket" {
#  bucket = aws_s3_bucket.website_bucket.id
#
#  block_public_acls       = true
#  block_public_policy     = true
#}

resource "aws_s3_bucket_object" "files" {
  for_each = fileset("./my-site/dist", "**/*") 

  bucket = aws_s3_bucket.website_bucket.bucket
  key    = each.value
  source = "./my-site/dist/${each.value}"
  etag   = filemd5("./my-site/dist/${each.value}") # usefull to update cdn when change
  content_type = "text/html"
}

output "fileset-results" {
  value = fileset("./my-site/dist", "**/*")
}

locals {
  s3_origin_id = var.website_bucket_name
}


