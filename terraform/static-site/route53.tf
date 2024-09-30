
resource "aws_route53_zone" "primary" {
  name = var.domain_name
}

resource "aws_route53_zone" "secondary" {
  name = var.domain_name_two
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.primary.zone_id
  name = var.domain_name
  type = "A"
  alias {
    name = aws_cloudfront_distribution.s3_distribution.domain_name    
    zone_id = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_two" {
  zone_id = aws_route53_zone.secondary.zone_id
  name = var.domain_name_two
  type = "A"
  alias {
    name = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
