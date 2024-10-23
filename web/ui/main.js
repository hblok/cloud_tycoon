import loadSvg from "./load_svg.js";

function main() {
    loadSvg("#map", "eu_names.svg");
}

$(document).ready(main);
