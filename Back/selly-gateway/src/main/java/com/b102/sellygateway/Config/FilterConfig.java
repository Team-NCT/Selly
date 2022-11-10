package com.b102.sellygateway.Config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// application.yml 파일에 gateway를 구성해놨기 때문에 @Configuration, Bean을 주석처리
//@Configuration
public class FilterConfig {
//  @Bean
  public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
    return builder.routes()
            .route(r -> r.path("/selly-user-service/**")
                    .filters(f -> f.addRequestHeader("selly-user-request", "selly-user-request-header")
                            .addResponseHeader("selly-user-response", "selly-user-response-header"))
                    .uri("http://localhost:8081"))
            .build();
  }
}
