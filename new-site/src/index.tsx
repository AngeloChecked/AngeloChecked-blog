import posts from "./post/index.tsx";
export const title = "Home";
export const description = "the home page of my blog";
export const layout = "layouts/home.tsx";

export const menu = {
  title: "Welcome to angelo ceccato blog!",
  visible: true,
  order: 0,
};

export default (data: Lume.Data, helpers: Lume.Helpers) => (
  <>
    <div className="home-introduction">
      <img style={{ maxWidth: "150px" }} src={data.site.logo} />
      <p>
        <strong>The AngeloChecked Garden</strong>
      </p>
      <p>
        <i>This is just the place where I put my thoughts.</i>
      </p>
      <span className="social-list">
        {data.site.social?.map((social: any) => {
          return (
            <a href={social.link}>
              <i className={social.class}></i>
            </a>
          );
        })}
      </span>
    </div>
    <br></br>
    <span>
      <h2>Latest posts:</h2>
      {posts(data, helpers, 2)}
    </span>
    <h2>The Garden Graph:</h2>
    <div id="graph-container"></div>
    <div style={{ textAlign: "center" }}>
      <div style={{ width: 200 , margin: "0 auto"}} id="graph-minimap-container" />
    </div>
  </>
);
