const style = `
  :host {
	display: block;
	box-sizing: border-box;
	overflow: hidden;
	aspect-ratio: 1.5857725083;
	border-radius: 4.065420561% / 6.44683216%;

	border: 1px solid rgba(0, 0, 0, 0.2);
	box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.3);

	& slot[name="card-front"] {
		display: block;
		height: 100%;
	}
  }
`

export class PlasticCard extends HTMLElement {
	#shadow

	constructor() {
		super()
		let styleSheet = new CSSStyleSheet()
		styleSheet.replaceSync(style)
		this.#shadow = this.attachShadow({ mode: "closed" })
		this.#shadow.adoptedStyleSheets = [styleSheet]
		this.#shadow.innerHTML = '<slot name="card-front"></slot>'
	}
}

export function definePlasticCard(tagName = "plastic-card") {
	customElements.define(tagName, PlasticCard)
}
