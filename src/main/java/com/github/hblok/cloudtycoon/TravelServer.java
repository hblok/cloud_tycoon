package com.github.hblok.cloudtycoon;

import com.github.hblok.cloudtycoon.proto.AgentGrpc;
import com.github.hblok.cloudtycoon.proto.ClientInfo;
import com.github.hblok.cloudtycoon.proto.ServerInfo;

import io.grpc.Grpc;
import io.grpc.InsecureServerCredentials;
import io.grpc.Server;
import io.grpc.ServerBuilder;
import io.grpc.stub.StreamObserver;
import java.io.IOException;
import com.google.protobuf.Timestamp;
import com.google.protobuf.util.Timestamps;


class TravelServer extends AgentGrpc.AgentImplBase {

    private final int port;

    TravelServer() {
	this.port = 12002;
    }

    public void ping(ClientInfo request,
		     StreamObserver<ServerInfo> responseObserver) {
	print("ping " + request.getMid().getTime());
	
	ServerInfo response = ServerInfo
	    .newBuilder()
	    .build();
	responseObserver.onNext(response);
	responseObserver.onCompleted();	
    }

    public void serverInfo(ClientInfo request,
			   StreamObserver<ServerInfo> responseObserver) {
	String city = request.getAirport().getCity();
	print("serverinfo city=" + city + ", time=" + request.getMid().getTime().getSeconds() + " " + Timestamps.toString(request.getMid().getTime()));

	long millis = System.currentTimeMillis();
	Timestamp timestamp = Timestamp.newBuilder().setSeconds(millis / 1000).build();
	
	ServerInfo response = ServerInfo
	    .newBuilder()
	    .setHostname(city)
	    .setIp("1.2.3.4")
	    .setCloud("amazon")
	    //	    .setTime(timestamp)
	    .build();
	responseObserver.onNext(response);
	responseObserver.onCompleted();
    }

    public void start() throws IOException, InterruptedException {
	print("\n\nStarting GRPC server on " + this.port);

	ServerBuilder<?> serverBuilder = Grpc.newServerBuilderForPort(
	    this.port, InsecureServerCredentials.create());
	Server server = serverBuilder.addService(this).build();
	server.start();
	server.awaitTermination();
    }

    private void print(String str) {
	System.out.println(str);
    }

    public static void main(String[] args) throws IOException, InterruptedException {
	TravelServer s = new TravelServer();
	s.start();
    }
}
