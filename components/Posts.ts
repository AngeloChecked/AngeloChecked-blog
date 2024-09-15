import { ProcessedPage } from "../routes.ts";

export function Posts(props: { postRoute: Record<string, ProcessedPage[]> }){
	const entry = Object.entries(props.postRoute)[0]
  const key = entry[0]
  const pages = entry[1]
	return `
			<ul>
			${
				pages.map(p => {
					return `<li><a href="${key +  p.relativeFilePath}">${p.title}</a></li>`
				}).join("")
			}
			</ul>
		`
}
