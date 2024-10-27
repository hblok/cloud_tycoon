package com.github.hblok.cloudtycoon;


import java.lang.management.ManagementFactory;
import com.sun.management.OperatingSystemMXBean;

import com.github.hblok.cloudtycoon.proto.Metrics;

class SystemInfo {

    private OperatingSystemMXBean bean;

    void init() {
	bean = (com.sun.management.OperatingSystemMXBean)ManagementFactory.getOperatingSystemMXBean();
    }

    Metrics getMetrics() {
	return Metrics
	    .newBuilder()
	    .putMetrics("load", bean.getSystemLoadAverage())
	    .putMetrics("mem_total", bean.getTotalPhysicalMemorySize())
	    .putMetrics("mem_free", bean.getFreePhysicalMemorySize())
	    .build();	
    }
    
}
