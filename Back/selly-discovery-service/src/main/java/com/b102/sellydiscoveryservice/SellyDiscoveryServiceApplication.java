package com.b102.sellydiscoveryservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class SellyDiscoveryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SellyDiscoveryServiceApplication.class, args);
	}

}
