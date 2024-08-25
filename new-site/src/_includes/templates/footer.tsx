import icons from "../icons.tsx"

function socialIconFromName(name?: string){
  if (!name) return undefined
  const Social = (icons as Record<string, any>)?.[name]
  return <Social height={"20px"} color="rgb(187, 0, 0)"/>
}

export default function foother(data: Lume.Data) {
  return (
    <footer>
      <ul>
        {data.site.social?.map((social: any) => {
          return (
            <li >
              <a href={social.link}>
                 {socialIconFromName(social.name)}
              </a>
            </li>
          );
        })}
      </ul>
    </footer>
  );
}
