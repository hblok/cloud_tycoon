package com.github.hblok.cloudtycoon;

import com.google.protobuf.Timestamp;
import com.google.protobuf.util.Timestamps;
import io.grpc.stub.StreamObserver;

import com.github.hblok.cloudtycoon.proto.AgentGrpc;
import com.github.hblok.cloudtycoon.proto.Airport;
import com.github.hblok.cloudtycoon.proto.ArriveResponse;
import com.github.hblok.cloudtycoon.proto.ClientInfo;
import com.github.hblok.cloudtycoon.proto.DepartResponse;
import com.github.hblok.cloudtycoon.proto.MessageId;
import com.github.hblok.cloudtycoon.proto.Metrics;
import com.github.hblok.cloudtycoon.proto.Package;
import com.github.hblok.cloudtycoon.proto.PackageTag;
import com.github.hblok.cloudtycoon.proto.Plane;
import com.github.hblok.cloudtycoon.proto.ServerInfo;


class AgentService extends AgentGrpc.AgentImplBase {
    
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

	MessageId mid = MessageId
	    .newBuilder()
	    .setTime(timestamp)
	    .build();

	Metrics metrics = Metrics
	    .newBuilder()
	    .putMetrics("load", 1)
	    .build();
	
	ServerInfo response = ServerInfo
	    .newBuilder()
	    .setHostname(city)
	    .setIp("1.2.3.4")
	    .setCloud("amazon")
	    .setMid(mid)
	    .setMetrics(metrics)
	    .build();
	responseObserver.onNext(response);
	responseObserver.onCompleted();
    }

    public void airportInfo(ClientInfo request,
			    StreamObserver<Airport> responseObserver) {
    }

    public void addPackage(Package request,
			   StreamObserver<PackageTag> responseObserver) {
    }

    public void depart(Plane request,
		       StreamObserver<DepartResponse> responseObserver) {
    }

    public void arrive(Plane request,
		       StreamObserver<ArriveResponse> responseObserver) {
    }        

    private void print(String str) {
	System.out.println(str);
    }    
}
