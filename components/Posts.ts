import { ProcessedPage } from "../routes.ts";
import { cssClass } from "../style/css.ts";
import { rowClass } from "../style/mainCss.ts";

export function Posts(props: { postRoute: Record<string, ProcessedPage[]> }) {
	const entry = Object.entries(props.postRoute)[0];
	const key = entry[0];
	const pages = entry[1];

	const postListClass = cssClass({
		className: "post-list",
		properties: {
			flexWrap: "wrap",
			alignItems: "center",
			gap: "10px",
		},
		from: rowClass,
	});

	const tagContainerClass = cssClass({
		className: "tag-container",
		properties: {
			fontSize: "14px",
		},
		from: postListClass,
	});

	const tagClass = cssClass({
		className: "tag-container",
		properties: {
			color: "white",
			backgroundColor: "#121111",
			padding: "2px 5px",
			borderRadius: "5px",
		},
	});

	pages.sort((a, b) => {
		if (!a.data?.date) {
			return 1;
		}
		if (!b.data?.date) {
			return -1;
		}
		const aDate = new Date(a.data?.date);
		const bDate = new Date(b.data?.date);
		return aDate < bDate ? 1 : -1;
	});
	return `
<div>
			${
		pages.map((p) => {
			return `
<div style="${postListClass.inlineStyle}">
	<div>
		<a href="${key + p.relativeFilePath}">
		  <img width="200px" src="${p.data?.thumbnail?.src}">
		</a>
	</div>
	<div style="flex:0 50ch;">
		${p.data?.date && formatDate(p.data?.date)}
		<br>
		<a href="${key + p.relativeFilePath}">${p.data?.title}</a>
		<br>
		<div style="${tagContainerClass.inlineStyle}">
			${
				p?.tagId?.map((tag) => {
					return `<span style="${tagClass.inlineStyle}">${tag}</span>`;
				}).join(" ")
			}
		</div>
	</div>
</div>
<br>
`;
		}).join("")
	}
							</div>
		`;
}

function formatDate(date: string) {
	const objectDate = new Date(date);
	const day = objectDate.getUTCDay().toString().padStart(2, "0");
	const month = objectDate.getUTCMonth().toString().padStart(2, "0");
	const year = objectDate.getUTCFullYear();
	return `${year}-${month}-${day}`;
}
