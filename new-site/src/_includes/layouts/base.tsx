import header, { menu } from "../templates/header.tsx";
import icons from "../icons.tsx"

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
              <li style={{display:"flex", justifyContent:"center", flexFlow:"row"}}>
                <div style={{flex:"fit-content"}}>
                {socialIconFromName(social.name)}                 
                </div>
                <a href={social.link} style={{ display: "inline-block", }}>
                    &nbsp;{social.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}

function socialIconFromName(name?: string){
  if (!name) return undefined
  const Social = (icons as Record<string, any>)?.[name]
  return <Social  style={{ verticalAlign: "middle" }} height={"25px"} color="rgb(187, 0, 0)"/>
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
