function optionalLink(title: string, value?: string, label?: string) {
  return value && (
    <li>
      <strong>{title} :</strong> <a href={value}>{label ?? value}</a>
    </li>
  );
}

function optionalList(
  title: string,
  items: any[] | undefined,
  howExtractValueAndLabel: (_: any) => [string, string],
) {
  return items && (
    <li>
      <strong>{title}:</strong>
      <ul>
        {items?.map((item: any) => {
          const [value, label] = howExtractValueAndLabel?.(item);
          return (
            <li>
              <a href={value}>{label ?? value}</a>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

export function linkTemplate(data: Lume.Data, _helpers: Lume.Helpers) {
  return (
    <ul>
      <li>
        <strong>type:</strong> {data.graph.type}
      </li>
      {optionalLink("website", data.graph?.data?.website)}
      {optionalLink("github", data.graph?.data?.github)}
      {optionalLink("url", data.graph?.data?.url)}
      {optionalLink(
        "author",
        data.author?.url,
        data.author?.graph?.data?.name,
      )}
      {optionalList(
        "links",
        data.link,
        (link) => [link.url, link.graph?.data?.name],
      )}
      {optionalList("posts", data.post, (post) => [post.url, post.title])}
      {optionalList(
        "tags",
        data.tag,
        (tag) => [tag.url, tag.graph?.data?.name],
      )}
    </ul>
  );
}
