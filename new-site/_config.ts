import lume from "lume/mod.ts";
import attributes from "lume/plugins/attributes.ts";
import base_path from "lume/plugins/base_path.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import feed from "lume/plugins/feed.ts";
import filter_pages from "lume/plugins/filter_pages.ts";
import inline from "lume/plugins/inline.ts";
import katex from "lume/plugins/katex.ts";
import metas from "lume/plugins/metas.ts";
import modify_urls from "lume/plugins/modify_urls.ts";
import nav from "lume/plugins/nav.ts";
import relations from "lume/plugins/relations.ts";
import relative_urls from "lume/plugins/relative_urls.ts";
import resolve_urls from "lume/plugins/resolve_urls.ts";
import sitemap from "lume/plugins/sitemap.ts";
import postcss from "lume/plugins/postcss.ts";
import jsx from "lume/plugins/jsx.ts";
import remark from "lume/plugins/remark.ts";
import date from "lume/plugins/date.ts";
import myBlogGraphPlugin from "./src/_plugin/my_blog_graph_plugin.ts";
import jsdata from "./src/_plugin/jsdata_plugin.ts";
import mdPictureResolution from "./src/_plugin/md_picture_resolution_plugin.ts";
import rehypePrism from "npm:rehype-prism-plus/all";

const site = lume({
  src: "./src",
  emptyDest: false,
});

site.copy("favicon.ico");
site.copy("img");

site.use(attributes());
site.use(base_path());
site.use(code_highlight({ }));
// site.use(decap_cms());
// site.use(favicon());
site.use(feed());
site.use(filter_pages({}));
site.use(inline());
site.use(katex());
//site.use(metas());
site.use(modify_urls());
// site.use(pagefind());
site.use(relations(
  {
    foreignKeys: {
      tag: "tag_id",
      link: "link_id",
      author: "author_id",
      post: "post_id",
    },
  },
));
site.use(relative_urls());
site.use(remark({
  rehypePlugins: [
    rehypePrism,
  ],
}));
site.use(resolve_urls());
site.use(sitemap());
site.use(postcss());
site.use(jsx(/* Options */));
// site.use(mdx(/* Options */));

site.use(nav());
site.use(date());
site.use(myBlogGraphPlugin({
  foreignKeys: ["tagId", "authorId", "postId", "linkId"],
  containerId: "graph-container",
  minimapContainerId: "graph-minimap-container",
}));

// site.use((site: Site) => {
//   site.loadData([".md"]);
// });

site.use(jsdata());
site.use(mdPictureResolution({}));

export default site;
