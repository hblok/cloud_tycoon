package com.github.hblok.cloudtycoon;

import io.grpc.Grpc;
import io.grpc.InsecureServerCredentials;
import io.grpc.Server;
import io.grpc.ServerBuilder;

import java.io.IOException;

import com.github.hblok.cloudtycoon.AgentService;


class TravelServer {

    private final int port;

    private AgentService service;

    TravelServer() {
	this.port = 12002;
    }

    public void start() throws IOException, InterruptedException {
	print("\n\nStarting GRPC server on " + this.port);

	ServerBuilder<?> serverBuilder = Grpc.newServerBuilderForPort(
	    this.port, InsecureServerCredentials.create());
	this.service = new AgentService();
	Server server = serverBuilder.addService(service).build();
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
