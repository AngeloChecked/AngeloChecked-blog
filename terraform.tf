terraform {
  required_version = ">= 0.15"
  required_providers {
    aws = {
      version = ">= 3.0.0"
    }
  }
}


variable "aws_region" {
  type = string
}

variable "domain_name" {
  type = string
}

variable "domain_name_two" {
  type = string
}

variable "subject_alternative_names" {
  type = list(string)
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

provider "aws" {
  region = "us-east-1"
  alias  = "certificates"
}

module "website" {
  providers = {
    aws.acm_account = "aws.certificates"
  }

  source = "./.deploy/terraform/static-site"
  domain_name = var.domain_name
  domain_name_two = var.domain_name_two
  website_bucket_name = var.website_bucket_name
  route_profile = var.route_profile
  aws_region = var.aws_region
  subject_alternative_names = var.subject_alternative_names
}

