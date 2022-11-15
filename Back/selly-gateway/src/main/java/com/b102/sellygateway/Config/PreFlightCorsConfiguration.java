package com.b102.sellygateway.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.cors.reactive.CorsUtils;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

//@Configuration
public class PreFlightCorsConfiguration {
//  private static final String ALLOWED_HEADERS = "*";
//  private static final String ALLOWED_METHODS = "GET, PUT, POST, DELETE, OPTIONS";
//  private static final String ALLOWED_ORIGIN = "http://localhost:3000";
//  private static final String ALLOWED_CREDENTIALS = "true";
//  private static final String MAX_AGE = "3600";
//
//  @Bean
//  public WebFilter corsFilter() {
//
//    return (ServerWebExchange ctx, WebFilterChain chain) -> {
//
//      ServerHttpRequest request = ctx.getRequest();
//
//      if (CorsUtils.isPreFlightRequest(request)) {
//
//        ServerHttpResponse response = ctx.getResponse();
//
//        HttpHeaders headers = response.getHeaders();
//
//        headers.add("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
//
//        headers.add("Access-Control-Allow-Methods", ALLOWED_METHODS);
//
//        headers.add("Access-Control-Max-Age", MAX_AGE);
//
//        headers.add("Access-Control-Allow-Headers", ALLOWED_HEADERS);
//
//        headers.add("Access-Control-Allow-Credentials", ALLOWED_CREDENTIALS);
//
//        if (request.getMethod() == HttpMethod.OPTIONS) {
//
//          response.setStatusCode(HttpStatus.OK);
//
//          return Mono.empty();
//
//        }
//
//      }
//
//      return chain.filter(ctx);
//
//    };
//  }
}