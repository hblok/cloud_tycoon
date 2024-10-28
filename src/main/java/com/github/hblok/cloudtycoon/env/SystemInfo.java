package com.github.hblok.cloudtycoon.env;


import java.lang.management.ManagementFactory;
import com.sun.management.OperatingSystemMXBean;

import com.github.hblok.cloudtycoon.proto.Metrics;

public class SystemInfo {

    private OperatingSystemMXBean bean;

    public void init() {
	bean = (com.sun.management.OperatingSystemMXBean)ManagementFactory.getOperatingSystemMXBean();
    }

    public Metrics getMetrics() {
	return Metrics
	    .newBuilder()
	    .putMetrics("load", bean.getSystemLoadAverage())
	    .putMetrics("mem_total", bean.getTotalPhysicalMemorySize())
	    .putMetrics("mem_free", bean.getFreePhysicalMemorySize())
	    .build();	
    }
    
}
