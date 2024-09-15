import posts from "./post/index.tsx";
export const title = "page not found";
export const description = "page not found";
export const layout = "layouts/home.tsx";

export const menu = {
  title: "page not found",
  visible: true,
  order: 0,
};

export default (data: Lume.Data, helpers: Lume.Helpers) => (
  <>
    <h1>Page Not Found</h1>
  </>
);
