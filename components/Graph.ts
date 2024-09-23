import { html } from "../deps/html.ts";

type Props = {
	width: number;
	height: number;
	bgColor: string;
};

export function Graph(
	props: Props,
) {
	const innerWidth = 100;
	const innerHeight = 100;

	return html`
		<svg id="graph" viewBox="${-(innerWidth / 4)} ${-(innerHeight / 4)} ${
		innerWidth / 2
	} ${
		innerHeight / 2
	}" style="width:${props.width}px;height:${props.height}px; background-color:${props.bgColor};" draggable="true">

			${createCircle({point: new Point(0,0), radius: 5, color: "black", mouseEnterColor: "red"})}
			${createCircle({point: new Point(0,15), radius: 5, color: "black", mouseEnterColor: "red"})}
			${createCircle({point: new Point(0,-15), radius: 5, color: "black", mouseEnterColor: "red"})}
			${createCircle({point: new Point(45,0), radius: 5, color: "black", mouseEnterColor: "red"})}
			${createCircle({point: new Point(-45,0), radius: 5, color: "black", mouseEnterColor: "red"})}
		</svg>
		<script>
			const svg = document.querySelector("#graph")
			const onWheel = (event) => {
			  event.preventDefault()
				const viewBox = svg.getAttribute("viewBox")
				if(viewBox){
					let [xx, yy, w, h] = viewBox.split(" ").map(Number)
				  const movement = 5
				  const deltaY = !event.wheelDeltaY ? 0 : event.wheelDeltaY > 0 ? movement : -movement
				  const deltaX = !event.wheelDeltaX ? 0 : event.wheelDeltaX > 0 ? movement : -movement
	      	h += deltaY
	      	w += deltaY
	      	xx -= deltaY/2
	      	yy -= deltaY/2
					svg.setAttribute("viewBox", \`\$\{xx\} \$\{yy\} \$\{w\} \$\{h\}\`)
				}
			}		
			svg.addEventListener("wheel", onWheel)
			const onMouseMove = (event) => {
			  event.preventDefault()
			  if (event.buttons === 0) {
				  return;
			  }
				const viewBox = svg.getAttribute("viewBox")
				if(viewBox){
					let [xx, yy, w, h] = viewBox.split(" ").map(Number)
				  const biggerSide = ${Math.max(props.width, props.height)}
	      	yy += -((event.movementY*(h*2))/biggerSide)
	      	xx += -((event.movementX*(w*2))/biggerSide)
					svg.setAttribute("viewBox", \`\$\{xx\} \$\{yy\} \$\{w\} \$\{h\}\`)
				}
			}
			svg.addEventListener("mousemove", onMouseMove)
		</script>
		`;
}

class Point {
	constructor(
		public x: number,
		public y: number,
	) {}
}


function createCircle(props: {
	point: Point;
	radius: number;
	color: string;
	mouseEnterColor?: string;
}) {
	let onmouse = "";
	if (props.mouseEnterColor) {
		onmouse = `
		onmouseenter="this.setAttribute('fill', '${props.mouseEnterColor}')" 
		onmouseleave="this.setAttribute('fill', '${props.color}')" 
`;
	}
	return html`<circle ${onmouse} 
		cx="${props.point.x}" cy="${props.point.y}" r="${props.radius}" 
		fill="${props.color}"
	/>`;
}
