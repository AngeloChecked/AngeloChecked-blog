import { linkTemplate } from "../templates/link.tsx";

export const layout = "layouts/base.tsx";
export const bodyClass = "body-home";

export default (data: Lume.Data, _helpers: Lume.Helpers) => {
  return (
    <>
      <article>
        <h1>{data.title}</h1>
        {data.children}
        <div style={{ border: "solid black 1px", padding: 10 }}>
          {linkTemplate(data, _helpers)}
        </div>

        <br></br>
      </article>
    </>
  );
};

function disqus() {
  return (
    <>
      <div id="disqus_thread"></div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
window.disqus_config = function () {
    this.page.url = window.location.href;  
    this.page.identifier = window.location.pathname; 
};
(function() {  
    var d = document, s = d.createElement('script');
    s.src = "https://angeloceccato.disqus.com/embed.js";

    s.setAttribute('data-timestamp', +new Date());
    s.setAttribute('defer', true);
    s.setAttribute('async', true);
    (d.head || d.body).appendChild(s);
})();
  `,
        }}
      >
      </script>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `
<noscript>
  Please enable JavaScript to view the 
  <a href="https://disqus.com/?ref_noscript" rel="nofollow">
      comments powered by Disqus.
  </a>
</noscript>
  `,
        }}
      >
      </noscript>
    </>
  );
}
