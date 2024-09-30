import { ProcessedPage, RoutedPage } from "../routes.ts";

export function FeedRss(
  props: {
    feedItems: RoutedPage[];
    domain: string;
    latestBuildDate: string;
  },
) {
  return `
<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" xmlns:slash="http://purl.org/rss/1.0/modules/slash/" version="2.0">
  <channel>
    <title>My RSS Feed</title>
    <link>${props.domain}</link>
    <atom:link href="${props.domain}/feed.rss" rel="self" type="application/rss+xml"/>
    <description>AngeloChecked Blog</description>
    <lastBuildDate>${buildRFC822Date(props.latestBuildDate)}</lastBuildDate>
    <language>en</language>
    ${
    props.feedItems.map((page) =>
      feedItem({
        title: page.data?.title!,
        link: props.domain + page.relativeWebsitePath,
        parmaLink: props.domain + page.relativeWebsitePath,
        description: page.data?.description!,
        content: truncate(page.content + "...")!,
        date: buildRFC822Date(page.data?.date!),
      })
    ).join("\n")
  }
    </channel>
</rss>      
    `;
}

function feedItem(props: {
  title: string;
  link: string;
  parmaLink?: string;
  description: string;
  content: string;
  date: string;
}) {
  return `
    <item>
      <title>${props.title}</title>
      <link>${props.link}</link>
      <guid isPermaLink="${props.parmaLink ? "true" : "false"}">${
    props.parmaLink ? props.parmaLink : ""
  }</guid>
      <description>${props.description}</description>
      <content:encoded>
        <![CDATA[${props.content}]]>
      </content:encoded>
      <pubDate>${props.date}</pubDate>
    </item>
  `;
}

export function truncate(initialText: string, maxlength: number = 400) {
  if (!initialText) return undefined;
  const text = initialText.replace(/(<([^>]+)>)/g, "");
  return ((text.length > maxlength)
    ? text.slice(0, maxlength - 1) + "…"
    : text);
}

function buildRFC822Date(dateString: string) {
  const dayStrings = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthStrings = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const timeStamp = Date.parse(dateString);
  const date = new Date(timeStamp);

  const day = dayStrings[date.getDay()];
  const month = monthStrings[date.getMonth()];
  const dayNumber = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  //Wed, 02 Oct 2002 13:00:00 GMT
  return `${day}, ${dayNumber} ${month} ${year} 00:00:00 GTM`;
}
