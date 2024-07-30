import { Graph } from "../graph/pages.page.ts";

export function truncate(initialText: string, maxlength: number) {
  if (!initialText) return undefined;
  const text = initialText.replace(/(<([^>]+)>)/g, "");
  return ((text.length > maxlength)
    ? text.slice(0, maxlength - 1) + "…"
    : text);
}

export function fromGraphToPost(post: Graph) {
  const websiteUrl = `/post/${post.id}/`;
  return {
    layout: `/layouts/post.tsx`,
    type: `post`,
    url: websiteUrl,
    id: post.id,
    author_id: post.authorId,
    tag_id: post.tagId,
    link_id: post.linkId,
    graph: { websiteUrl, ...post },

    title: post.data.name,
    description: post.data.description,
    tags: post.data.searchTags,
    date: new Date(post.data.date as string),
    thumbnail: post.data.thumbnail,
  };
}
