import { fromGraphToPost } from "../_includes/utils.ts";
import { Graph } from "../graph/pages.page.ts";
import { learningTag } from "../graph/pages.page.ts";
import { angeloCeccatoAuthor } from "../graph/pages.page.ts";

export const theGardenTheGraphTheBlogPost: Graph = {
  type: "post",
  id: "the-garden-the-graph-the-blog",
  tagId: [learningTag.id],
  authorId: angeloCeccatoAuthor.id,
  data: {
    name: "The Garden, the Graph and the Blog (From Hugo to LumeJs)",
    description: "my deydrams of what my blog should be",
    searchTags: [
      "The Garden",
      "The Blog",
      "The Graph",
      "Blogging",
      "Learning",
      "Digital Garden",
      "The Web",
    ],
    date: "2023-12-27T16:00:00.000Z",
    thumbnail: { src: "/img/lion_witch_wardrobe.webp" },
  },
};

export default fromGraphToPost(theGardenTheGraphTheBlogPost);
