package com.nct.sellytradeservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class SellyTradeServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SellyTradeServiceApplication.class, args);
	}

}
