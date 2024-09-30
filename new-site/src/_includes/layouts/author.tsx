export const layout = "layouts/home.tsx";

export default (data: Lume.Data, _helpers: Lume.Helpers) => (
  <>
    <div id="graph-container"></div>
    <ul>
      <li>
        <strong>type:</strong> {data.graph.type}
      </li>
      <li>
        <strong>website:</strong> <a>{data.graph.data.website}</a>
      </li>
      <li>
        <strong>github:</strong> <a>{data.graph.data.github}</a>
      </li>
      <li>
        <strong>links:</strong>
        <ul>
          {data.link?.map((link: any) => (
            <li>
              <a href={link.url}>{link.graph.data.name}</a>
            </li>
          ))}
        </ul>
      </li>
      {data.post?.length && <li>
        <strong>posts:</strong>
        <ul>
          {data.post?.map((post: any) => (
            <li>
              <a href={post.url}>{post.title}</a>
            </li>
          ))}
        </ul>
      </li>}
    </ul>
    <hr></hr>
    <h3>
       {data.graph.data.name}
    </h3>
     {data.graph.data.description}
    {data.children}
  </>
);
