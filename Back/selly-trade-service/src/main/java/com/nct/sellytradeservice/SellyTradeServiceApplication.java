package com.nct.sellytradeservice;

import com.nct.sellytradeservice.error.FeignClientExceptionErrorDecoder;
import com.nct.sellytradeservice.error.FeignErrorDecoder;
import feign.Logger;
import feign.codec.ErrorDecoder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class SellyTradeServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SellyTradeServiceApplication.class, args);
	}

	@Bean
	public Logger.Level feignLoggerLevel() {
		return Logger.Level.FULL;
	}

	@Bean
	@ConditionalOnMissingBean(value = ErrorDecoder.class)
	public FeignClientExceptionErrorDecoder commonFeignErrorDecoder() {
		return new FeignClientExceptionErrorDecoder();
	}

	@Bean
	public FeignErrorDecoder getFeignErrorDecoder() {
		return new FeignErrorDecoder();
	}

}
