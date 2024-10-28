package com.github.hblok.cloudtycoon.env;

import java.util.Properties;
import java.util.Map;
import java.io.BufferedReader;
import java.io.InputStreamReader;


public class CloudInfo {

    String name = null;

    public String getPlatformName() {
	if (name != null) {
	    return name;
	}

	if (isAmazon()) {
	    name = "AWS EC2";
	} else if (isAzure()) {
	    name = "Azure";
	} else if (isBazel()) {
	    name = "Bazel";
	} else {
	    name = "local";
	}

	return name;
    }

    private boolean isAmazon() {
	for (Map.Entry<?,?> e : System.getProperties().entrySet()) {
	    System.out.println(e);
	}

	for (Map.Entry<?,?> e : System.getenv().entrySet()) {
	    System.out.println(e);
	}

	return false;
    }
    
    private boolean isAmazon2() {
	try {
	    Process p = Runtime.getRuntime().exec("dmidecode -t system ");
	    p.waitFor();
	    BufferedReader b = new BufferedReader(new InputStreamReader(p.getInputStream()));
	    System.out.println(b.lines().toList());
	} catch (Exception e) {
	    System.out.println(e);
	}

	return false;
    }

    private boolean isAzure() {
	return false;
    }
    
    private boolean isBazel() {
	for (Map.Entry<?,?> e : System.getenv().entrySet()) {
	    String key = e.getKey().toString();
	    if (key == "TEST_SRCDIR" || key.contains("RUNFILES_")) {
		return true;
	    }
	}

	return false;
    }
}
