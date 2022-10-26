package com.b102.sellygateway.filter;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.OrderedGatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class LoggingFilter extends AbstractGatewayFilterFactory<GlobalFilter.Config> {
  public LoggingFilter(){
    super(GlobalFilter.Config.class);
  }

  @Override
  public GatewayFilter apply(GlobalFilter.Config config) {
//    return ((exchange, chain) -> {
//      ServerHttpRequest request = exchange.getRequest();
//      ServerHttpResponse response= exchange.getResponse();
//
//      log.info("Logging Filter baseMessage: {}", config.getBaseMessage());
//
//      if(config.isPreLogger()){
//        log.info("Logging PRE Filter: request id -> {}", request.getURI());
//      }
//      return chain.filter(exchange).then(Mono.fromRunnable(()->{
//        if (config.isPostLogger()){
//          log.info("Logging fPOST Filter: response code -> {}", response.getStatusCode());
//        }
//      }));
//    });
    // 필터 우선순위 적용법
    GatewayFilter filter = new OrderedGatewayFilter((exchange, chain) -> {
      ServerHttpRequest request = exchange.getRequest();
      ServerHttpResponse response = exchange.getResponse();

      log.info("Logging Filter baseMessage: {}", config.getBaseMessage());

      if (config.isPreLogger()) {
        log.info("Logging PRE Filter: request id -> {}", request.getURI());
      }
      return chain.filter(exchange).then(Mono.fromRunnable(() -> {
        if (config.isPostLogger()) {
          log.info("Logging fPOST Filter: response code -> {}", response.getStatusCode());
        }
      }));
    }, Ordered.HIGHEST_PRECEDENCE);
    return filter;
  }

  @Data
  public static class Config {
    // Put the configuration properties
    private String baseMessage;
    private boolean preLogger;
    private boolean postLogger;
  }

}
