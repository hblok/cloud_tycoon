package com.github.hblok.cloudtycoon;

import org.easymock.EasyMock;
import org.junit.Test;
import org.junit.Before;
import static org.junit.Assert.assertTrue;

import io.grpc.stub.StreamObserver;

import com.github.hblok.cloudtycoon.AgentService;
import com.github.hblok.cloudtycoon.proto.ClientInfo;
import com.github.hblok.cloudtycoon.proto.ServerInfo;


public class AgentServiceTest {

    private StreamObserver<ServerInfo> mockObs;

    @Before
    public void setUp() {
	mockObs = EasyMock.mock(StreamObserver.class);
    }
    
    @Test
    public void ping() {
	ClientInfo req = ClientInfo.newBuilder().build();
      
	AgentService as = new AgentService();
	as.ping(req, mockObs);
    }

    @Test
    public void serverInfo() {
	ClientInfo req = ClientInfo.newBuilder().build();
      
	AgentService as = new AgentService();
	as.serverInfo(req, mockObs);
    }    
}
