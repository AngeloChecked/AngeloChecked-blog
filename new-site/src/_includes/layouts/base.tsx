import header, { menu } from "../templates/header.tsx";

export const layout = "layouts/base.vto";

function footer(data: Lume.Data) {
  return (
    <footer>
      <div>
        © 2024 Angelo Ceccato. Created with{" "}
        <a href={"https://lume.land/"}>Lume</a>, powered by{" "}
        <a href={"https://github.com/antvis/G6"}>Antv-G6</a>, heavy inspired by
        {" "}
        <a href={"https://github.com/MaggieAppleton/digital-gardeners"}>
          Digital Gardeners
        </a>{" "}
        and a bit by my previous theme:{" "}
        <a href={"https://github.com/Vimux/Mainroad"}>Mainroad</a>.
      </div>
      <div>
        <strong>Menu:</strong>
        <ul>
          {menu(data)}
        </ul>
      </div>
      <div>
        <strong>Social:</strong>
        <ul>
          {data.site.social?.map((social: any) => {
            return (
              <li>
                <a href={social.link}>
                  <i className={social.class}>{social.name}</i>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}

export default (data: Lume.Data, _helpers: Lume.Helpers) => (
  <>
    {header(data)}
    <main className={`${data.bodyClass}`}>
      {data.children}
    </main>

    {footer(data)}
  </>
);
