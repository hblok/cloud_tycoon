import travel_pb from "travel_pb";
import travel_grpc_web_pb from "travel_grpc_web_pb";
import "google-protobuf/google/protobuf/timestamp_pb.js";

class Agent {

    #client = null;
    #map = null;

    constructor(server_url) {
	this.url = server_url;
    }

    init() {
	this.#client = new travel_grpc_web_pb.AgentClient(this.url);

	this.pingServer();
    }

    setMap(mapObject) {
	this.#map = mapObject;
    }

    pingServer() {
	const request = new travel_pb.ClientInfo();
	request.setName(name);

	this.#client.ping(request, {}, (err, response) => {
	    if (err) {
		console.error("gRPC error", err);
	    } else {
		this.#map.onAgentLoaded();
	    }
	});	
    }

    epoch_seconds() {
	return Math.floor( Date.now() / 1000 );
    }

    getServerInfo(cityName, callBack) {
	const request = new travel_pb.ClientInfo();
	request.setCity(cityName);

	const timestamp = new proto.google.protobuf.Timestamp([this.epoch_seconds()]);
	//console.log("r: ", timestamp.getSeconds()); //, timestamp.toLocalString());
	request.setTime(timestamp);

	this.sendRequest("serverInfo", request, callBack);
    }

    sendRequest(method, request, callBack) {
	const handleResponse = function (err, response) {
	    if (err) {
		console.error("gRPC error", err);
	    } else {
		//console.log("handleResponse", response);
		callBack(response);
	    }	    
	};

	//console.log("sendRequest", request, callBack, handleResponse);
	//console.log("sendRequest", request);
	this.#client[method](request, {}, handleResponse);
    }
}

export default Agent;
