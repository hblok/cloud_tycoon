import {SVG} from "@svgdotjs/svg.js";

//console.log("menu SVG: ", SVG);

const BUTTON = "button";
const INFO = "info";
const LINE = "line";

const highlightMargin = 4;


class Menu {

    #items = [];
    #itemY = 0;

    #rendered = false;

    constructor(x, y, width, height, elementId) {
	//this.checkInt(x);
	//this.checkInt(y);
	
	this.checkInt(width);
	this.checkInt(height);
	this.checkStr(elementId);
	
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	this.draw = SVG(elementId);

	if (this.draw == null) {
	    throw new Error("Failed to create or find SVG element");
	}

	this.grp = this.draw.group();

	if (this.grp == null) {
	    throw new Error("Failed to create SVG group node");
	}
    }

    checkInt(v) {
	if (!Number.isInteger(v)) {
	    throw new TypeError("Argument must be int");
	}
    }

    checkStr(v) {
	if (!(typeof v === 'string' || v instanceof String)) {
	    throw new TypeError("Argument must be a string");
	}
    }

    addButton(text, onclick) {
	this.#items.push({type: BUTTON, text: text, onclick: onclick});
    }

    addInfo(text) {
	this.#items.push({type: INFO, text: text});
    }    

    addDivider() {
	this.#items.push({type: LINE});
    }

    show() {
	if (this.#rendered) {
	    this.grp.show();
	} else {
	    this.render();
	    this.#rendered = true;
	}
    }

    hide() {
	this.grp.hide();
    }

    render() {
	//console.log("render(): ", this);

	let mouseSensor = this.grp.rect(this.width + 20, this.height + 20)
	    .x(this.x - 10).y(this.y - 10).fill({color: "white", opacity: "0.01"});
	this.grp.node.onmouseleave = $.proxy(this.hide, this);
	
	let background = this.grp.rect(this.width, this.height)
	    .x(this.x).y(this.y).stroke({width: 1, color: "#444"}).fill("white");

	this.#itemY = this.y + 8;
	this.#items.forEach((item) => {
	    if (item.type === BUTTON) {
		this.renderButton(item);
	    } else if(item.type == INFO) {
		this.renderInfo(item.text);
	    } else if(item.type == LINE) {
		this.renderLine();
	    }
	});
    }

    renderButton(item) {
	const highlightWidth = this.width - highlightMargin * 2;
	const highlightHeight = 24;
	
	let box = this.grp.rect(highlightWidth, highlightHeight)
	    .x(this.x + highlightMargin).y(this.#itemY - 1).fill("#fff");
	let txt = this.renderInfo(item.text);

	let mouseover = function() {
	    box.fill("#99d2e8");
	};

	let mouseout = function() {
	    box.fill("#fff");
	};

	box.node.onmouseover = mouseover;
	box.node.onmouseout = mouseout;
	txt.node.onmouseover = mouseover;
	txt.node.onmouseout = mouseout;
    
	box.click(item.onclick);
	txt.click(item.onclick);
    }

    renderInfo(text) {
	const font = {
	    family: "Courier New",
	    size: 14
	};
	let txt = this.grp.text(text).x(this.x + highlightMargin + 1).y(this.#itemY).font(font);
	this.#itemY += 24;

	return txt;
    }

    renderLine() {
	let y = this.#itemY;
	this.grp.line(this.x, y, this.x + this.width, y).stroke({ width: 1, color: "#444" });

	this.#itemY += 4;
    }
	
}

export default Menu;

