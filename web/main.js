import Agent from "agent_grpc";
import SvgMap from "svg_map";

function main() {
    let map = new SvgMap("#map", "gfx/eu_names.svg");
    //let agent = new Agent("http://localhost:12000/api/");
    let agent = new Agent("/api/");

    // mutual bind, no calls
    map.setAgent(agent);
    agent.setMap(map);

    // load both
    // map.loadSvg -> map.setupSvg -> agent.init -> map.onAgentLoaded
    map.loadSvg();
}

$(document).ready(main);
