export const layout = "layouts/home.tsx";
export const title = "Resources Graph";
export const description = "a tentative to describe my knowled and diary";
export const menu = {
  visible: true,
  title: "Graph",
  order: 3,
};

export default (data: Lume.Data, _helpers: Lume.Helpers) => (
  <>
    <div style={{
        width: "100%",
        height: 400,
        background: "white"
    }} id="graph-container">
    </div>
    <div style={{ textAlign: "center" }}>
      <div style={{ width: 200 , margin: "0 auto"}} id="graph-minimap-container" />
    </div>
    {data.nav.menu('/graph/').children.map((cluster: any) => (
      <span>
        <p>{cluster.slug}s</p>
        {cluster?.children?.map((item: any) => (
          <>
              <a key={item?.graph?.name} href={item.data?.url}>
                <p>{item.data?.title}</p>
              </a>
          </>
        ))}
      </span>
    ))}
  </>
);
