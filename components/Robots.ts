export function Robots(props: { domain: string }) {
  return `User-agent: *
Allow: /

Sitemap: ${props.domain}/sitemap.xml`;
}
