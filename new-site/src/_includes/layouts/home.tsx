
export const layout = "layouts/base.tsx";
export const bodyClass =  "home";

export default (data: Lume.Data, _helpers: Lume.Helpers) => (
  <>
    {data.children}
  </>
);
