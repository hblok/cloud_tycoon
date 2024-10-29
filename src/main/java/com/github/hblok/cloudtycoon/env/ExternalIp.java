package com.github.hblok.cloudtycoon.env;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;


public class ExternalIp {

    private static String[] IP_SERVICES = {
	"http://checkip.amazonaws.com/",
	"http://icanhazip.com",
	"http://ifconfig.co/ip",
	"http://ifconfig.me/ip",
	"http://wtfismyip.com/text",
	"https://ipecho.net/plain",
	"https://myexternalip.com/raw",
    };

    private String ip = null;

    public String getIp() {
	if (ip != null) {
	    return ip;
	}

	for (String url : IP_SERVICES) {
	    try {
		return ip = read(url);
	    } catch(Exception e) {
		System.out.println(url + " : " + e);
	    }
	}
		
	return "UNKNOWN";
    }

    private String read(String urlStr) throws Exception {
	//System.out.println("Try: " + urlStr);
	
	URL url = new URL(urlStr);
	URLConnection con = url.openConnection();
	InputStream in = con.getInputStream();
	BufferedReader b = new BufferedReader(new InputStreamReader(in));
	List<String> l = b.lines().toList();
	return l.get(0);
    }
}
