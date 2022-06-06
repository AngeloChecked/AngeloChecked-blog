# .deploy/terraform/static-site/route53.tf
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

resource "aws_route53_zone" "ns_update" {
  name = var.domain_name

  provisioner "local-exec" {
    command = <<EOF
       update_domain() { 
       AWS_PROFILE=${var.route_profile} && aws route53domains
       update-domain-nameservers \ --region ${var.aws_region} \ --domain-name ${var.domain_name} \
          --nameservers Name=${element(aws_route53_zone.primary.name_servers, 0)} Name=${element(aws_route53_zone.primary.name_servers, 1)} Name=${element(aws_route53_zone.primary.name_servers, 2)} Name=${element(aws_route53_zone.primary.name_servers, 3)}
       } 
       echo `update_domain`
       EOF
  }
}

resource "aws_route53_zone" "ns_update_two" {
  name = var.domain_name_two

  provisioner "local-exec" {
    command = <<EOF
       update_domain() { 
       AWS_PROFILE=${var.route_profile} && aws route53domains update-domain-nameservers \
          --region ${var.aws_region} \
          --domain-name ${var.domain_name_two} \
          --nameservers Name=${element(aws_route53_zone.primary.name_servers, 0)} Name=${element(aws_route53_zone.primary.name_servers, 1)} Name=${element(aws_route53_zone.primary.name_servers, 2)} Name=${element(aws_route53_zone.primary.name_servers, 3)}
       } 
       echo `update_domain`
    EOF
  }
}

# "echo 'AWS_PROFILE=${var.route53profile} && ${element(aws_route53_zone.primary.name_servers, 0)} ${element(aws_route53_zone.primary.name_servers, 1)} ${element(aws_route53_zone.primary.name_servers, 2)} ${element(aws_route53_zone.primary.name_servers, 3)}' > prova.txt "
