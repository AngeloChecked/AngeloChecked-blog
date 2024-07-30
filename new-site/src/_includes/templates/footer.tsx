export default function foother(data: Lume.Data) {
  return (
    <footer>
      <ul>
        {data.site.social?.map((social: any) => {
          return (
            <li >
              <a href={social.link}>
                <i className={social.class}>{social.name}</i>
              </a>
            </li>
          );
        })}
      </ul>
    </footer>
  );
}
