package com.b102.sellygateway.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class CustomFilter extends AbstractGatewayFilterFactory<CustomFilter.Config> {

  public CustomFilter(){
    super(Config.class);
  }

  @Override
  public GatewayFilter apply(Config config) {
    return (exchange, chain) -> {
      // import를 reactive 붙은 것을 가져와야함
      ServerHttpRequest request = exchange.getRequest();
      ServerHttpResponse response = exchange.getResponse();

      log.info("Custom PRE filter : request id -> {}", request.getId());


      return chain.filter(exchange).then(Mono.fromRunnable(() -> {
        log.info("Custom POST filter : response code -> {}", response.getStatusCode());
      }));
    };
  }
  public static class Config {
    // Put the configuration properties
  }
}
