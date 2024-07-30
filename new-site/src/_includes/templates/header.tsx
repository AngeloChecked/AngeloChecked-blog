import type { ReactNode } from "react";
type Entry = {
  children: Entry[];
  data: {
    url: string;
    menu: {
      order: number;
      visible: boolean;
      title: boolean;
    };
  };
};

function navItem(entry?: Entry, url?: string): ReactNode {
  return (
    <>
      {entry?.data?.menu?.visible && (
        <li>
          <a
            href={entry.data.url}
            aria-current={entry.data.url == url ? "page" : undefined}
          >
            {entry.data.menu.title}
          </a>
        </li>
      )}
      {entry?.children &&
        entry.children.map((child) => navItem(child, url))}
    </>
  );
}

const compFn = (c1: Entry, c2: Entry) =>
  c1.data?.menu?.order > c2.data?.menu?.order ? 1 : -1;

export function menu(data: any) {
  return data.nav.menu("/").children.toSorted(compFn).map((entry: Entry) =>
    navItem(entry, data.url)
  );
}

export default (data: Lume.Data) => (
  <>
    <nav className="navbar">
      <a href="/" className="navbar-home">
        <img className="site-logo" src={data.site.logo} alt={"angelochecked logo"} />
        <span>
          <strong>{data.site.homepageName}</strong>
          <br />
          <i>{data.site.description}</i>
        </span>
      </a>

      <ul className="navbar-links">
        {menu(data)}
      </ul>

      <span className="navbar-search">
        <span id="search"></span>
      </span>
    </nav>
  </>
);
