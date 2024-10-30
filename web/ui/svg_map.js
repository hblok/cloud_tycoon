import CityMenu from "./citymenu.js";
import {find, SVG} from "@svgdotjs/svg.js";

const cityCircleRadius = 4;

class SvgMap {

    #mapElementId = null;
    #mapUrl = null;
    #mapSvg = null;
    #agentGrpc = null;

    constructor(elementId, fileUrl) {
	this.#mapElementId = elementId;
	this.#mapUrl = fileUrl;
    }

    setAgent(agent) {
	this.#agentGrpc = agent;
    }

    loadSvg() {
	this.#mapSvg = SVG(this.#mapElementId);

	$.get(this.#mapUrl, $.proxy(this.setupSvg, this), "xml");
    }

    setupSvg(contents) {
	let $tmp = $('svg', contents);
	this.#mapSvg.svg($tmp.html());

	this.#mapSvg.transform({
	    scale: 1.50,
	    translateX: 300,
	    translateY: 100
	});

	this.#agentGrpc.init();
    }

    onAgentLoaded() {
	console.log("onAgentLoaded");
	
	this.setupCityMenus();
    }

    findCities() {
	var result = [];

	var map = find(this.#mapElementId);
	var mapNode = map[0].node;
	
	let cities = mapNode.children.namedItem("cities").children;

	for (let i = 0; i < cities.length; i++) {
	    let c = cities[i];
	    result.push(c);
	}

	return result;
    }

    setupCityMenus() {
	const cities = this.findCities();
	cities.forEach((city) => {
	    this.setupCity(city);
	});
    }

    setupCity(city) {
	SVG(city).radius(cityCircleRadius);
	this.addMenu(city);

	// TODO: load info?
    }

    addMenu(city) {
	const circle = SVG(city);
	const x = circle.x() + 10;
	const y = circle.y();

	//console.log(this.#mapSvg.viewbox(), this.#mapSvg.bbox(), this.#mapSvg.rbox());

	const mapHeight = this.#mapSvg.height();

	const info = {
	    "city": city.id,
	    "mapHeight": mapHeight
	};

	let menu = new CityMenu(info, this.#agentGrpc, x, y);

	city.onmouseover = $.proxy(menu.show, menu);
    }
}

export default SvgMap;
