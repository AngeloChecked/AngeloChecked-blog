variable "aws_region" {
  type = string
}

variable "domain_name" {
  type = string
}

variable "domain_name_two" {
  type = string
}

variable "website_bucket_name" {
  type = string
}

variable "route_profile" {
  type = string
}

provider "aws" {
  profile = "default"
  region = var.aws_region
}

module "website" {
  source = "./.deploy/terraform/static-site"
  domain_name = var.domain_name
  domain_name_two = var.domain_name_two
  website_bucket_name = var.website_bucket_name
  route_profile = var.route_profile
  aws_region = var.aws_region
}

