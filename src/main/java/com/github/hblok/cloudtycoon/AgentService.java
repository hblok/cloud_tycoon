package com.github.hblok.cloudtycoon;

import com.google.protobuf.Timestamp;
import com.google.protobuf.util.Timestamps;
import io.grpc.stub.StreamObserver;

import com.github.hblok.cloudtycoon.proto.AgentGrpc;
import com.github.hblok.cloudtycoon.proto.ClientInfo;
import com.github.hblok.cloudtycoon.proto.ServerInfo;


class AgentService  extends AgentGrpc.AgentImplBase {
    
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

    private void print(String str) {
	System.out.println(str);
    }    
}
