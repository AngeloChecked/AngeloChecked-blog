import { truncate } from "../_includes/utils.ts";

export const layout = "layouts/home.tsx";
export const title = "my posts";
export const description = "prova";
export const menu = {
  visible: true,
  title: "Posts",
  order: 1,
};


export default (
  data: Lume.Data,
  helpers: Lume.Helpers,
  limit: number | undefined = undefined,
) => {
  const posts = data.nav.menu("/post/", undefined, "date=desc")
    .children
    ?.slice(0, limit ?? Infinity)
    ?.sort((a: any, b: any) =>
      new Date(a.data.date) < new Date(b.data.date) ? 1 : -1
    );

  return (
    <>
      <span className="post-list">
        {posts?.map((post: any) => (
          <span className="post-card">
            <span>
              <img
                style={{ maxWidth: "235px" }}
                src={post.data?.thumbnail?.src}
              >
              </img>
            </span>
            <span className="post-item">
              <a href={post.data?.url}>
                <h1>{post.data?.title}</h1>
              </a>
              <h5>{helpers.date(post.data?.date, "MMMM, dd yyyy")}</h5>
              <span className="post-tags">
                {post.data?.tag?.map((x: any) => (
                  <span className="post-tag">
                    {x.title}
                  </span>
                ))}
              </span>
              <p className="post-description">
                <i>{truncate(helpers.md(post?.data?.content), 400)}</i>
              </p>
              <a href={post.data?.url}>KEEP READING {">>"}</a>
            </span>
          </span>
        ))}
      </span>
    </>
  );
};
