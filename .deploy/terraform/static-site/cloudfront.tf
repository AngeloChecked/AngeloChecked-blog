resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = var.website_bucket_name
}  

resource "aws_acm_certificate" "default" {
  provider = aws.acm_account 
  domain_name = var.domain_name
  subject_alternative_names = var.subject_alternative_names 
  validation_method = "DNS"  
  lifecycle {
    create_before_destroy = true
  }
} 

output "domain_validation_options" {
  value = "${aws_acm_certificate.default.domain_validation_options}"
}

resource "aws_route53_record" "cert_all" {
  for_each = {
    for dvo in aws_acm_certificate.default.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
      zone_id = contains([var.domain_name_two, "*.${var.domain_name_two}"], dvo.domain_name) ? aws_route53_zone.secondary.zone_id : aws_route53_zone.primary.zone_id
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = each.value.zone_id 
 
  depends_on = [aws_acm_certificate.default]
}

resource "aws_acm_certificate_validation" "default" {
  provider = aws.acm_account 
  certificate_arn         = aws_acm_certificate.default.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_all : record.fqdn]
}
    
resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.website_bucket.website_endpoint
    origin_id   = local.s3_origin_id

    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }

#   domain_name = aws_s3_bucket.website_bucket.bucket_regional_domain_name
#   origin_id   = local.s3_origin_id
#   custom_origin_config = aws_s3_bucket.website_bucket.website_endpoint

#    s3_origin_config {
#      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
#    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "my-website-cloudfront"
  default_root_object = "index.html"

  # If you have domain configured use it here 
  aliases = [var.domain_name, var.domain_name_two, "*.${var.domain_name}", "*.${var.domain_name_two}"]

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  # Cache behavior with precedence 0
  ordered_cache_behavior {
    path_pattern     = "/post/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false
      headers      = ["Origin"]

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  # Cache behavior with precedence 1
  ordered_cache_behavior {
    path_pattern     = "/docs/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  price_class = "PriceClass_200"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.default.arn
    ssl_support_method = "sni-only" 
  }
}

# to get the Cloud front URL if doamin/alias is not configured
output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.s3_distribution.domain_name
}
