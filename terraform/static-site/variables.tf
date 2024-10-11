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

variable "website_logging_bucket_name" {
  type = string
}

variable "route_profile" {
  type = string
}

variable "aws_region" {
  type = string
}
