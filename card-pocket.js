const style = `
:host {
	--card-pocket-inline-padding: 16px;
	--card-pocket-lip-height: 30px;

	display: block;
	box-sizing: border-box;
	position: relative;
	overflow: hidden;
	/* some default spacing not to cut content shadows */
	padding-block: 8px;

	&::after /* smoothen edge shadows */ {
		content: "";
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		z-index: 1;
		background:
			linear-gradient(to right, #fff, #0ff0 var(--card-pocket-inline-padding, 16px)),
			linear-gradient(to left, #fff, #0ff0 var(--card-pocket-inline-padding, 16px));
	}

	& slot[name="pocket"] {
		display: block;
		margin-inline: var(--card-pocket-inline-padding, 16px);
	}

	#pocket-lip {
		box-sizing: border-box;
		position: absolute;
		width: 100%;
		height: var(--card-pocket-lip-height, 24px);
		bottom: 0;
		left: 0;
		z-index: 1;

		filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.45));
		&::after {
			content: "";
			display: block;
			position: absolute;
			height: inherit;
			width: inherit;
			top: 0;
			background: white;
			mask: radial-gradient(
				circle var(--card-pocket-lip-height, 24px) at 50% -15px,
				#0000 var(--card-pocket-lip-height, 24px),
				#000);
		}
	}
}

/* animated properties */

:host {
	& slot[name="pocket"] {
		margin-bottom: -46%;
		transform: scale(0.97);
		transition: margin-bottom 120ms ease-out;
	}

	& #pocket-lip {
		transition: opacity 200ms ease-out;
		opacity: 1;
	}
}

:host(:not([open])[peek]:hover) {
	& slot[name="pocket"] {
		margin-bottom: -42%;
		transition: margin-bottom 200ms ease-out;
	}
}

:host([open]) {
	& slot[name="pocket"] {
		margin-bottom: var(--card-pocket-lip-height, 24px);;
		transform: scale(1);
		transition:
      		margin-bottom 280ms ease-out,
      		transform 220ms ease 240ms;
	}

	& #pocket-lip {
		transition: opacity 200ms ease-out 200ms;
		opacity: 0;
	}
}
`

export class CardPocket extends HTMLElement {
	#shadow
	interactive = true

	constructor() {
		super()
		let styleSheet = new CSSStyleSheet()
		styleSheet.replaceSync(style)
		this.#shadow = this.attachShadow({ mode: "closed" })
		this.#shadow.adoptedStyleSheets = [styleSheet]
		this.#shadow.innerHTML = '<slot name="pocket"></slot><div id="pocket-lip">'
	}

	connectedCallback() {
		this.interactive = !this.hasAttribute("non-interactive")
		this.addEventListener("click", this.handleClick.bind(this))
	}

	disconnectedCallback() {
		this.removeEventListener("click", this.handleClick.bind(this))
	}

	handleClick() {
		if (this.interactive) {
			this.toggleAttribute("open")
		}
	}
}

export function defineCardPocket(tagName = "card-pocket") {
	customElements.define(tagName, CardPocket)
}
