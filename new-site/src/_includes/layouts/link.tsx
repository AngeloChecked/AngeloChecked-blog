import { linkTemplate } from "../templates/link.tsx";

export const layout = "layouts/home.tsx";


export default (data: Lume.Data, _helpers: Lume.Helpers) => (
  <>
    <div id="graph-container"></div>
    <hr></hr>
    {linkTemplate(data, _helpers)}
    <h3>
      {data.graph.data.name}
    </h3>
    {data.graph.data.description}
    {data.children}
  </>
);
