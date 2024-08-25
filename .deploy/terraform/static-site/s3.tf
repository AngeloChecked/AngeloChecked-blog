resource "aws_s3_bucket" "website_bucket" {
  bucket = var.website_bucket_name
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

resource "aws_s3_object" "files" {
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


