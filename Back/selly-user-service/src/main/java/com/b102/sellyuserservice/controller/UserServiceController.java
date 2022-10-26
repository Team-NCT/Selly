package com.b102.sellyuserservice.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/selly-user-service")
@Slf4j // log를 쓰기 위한 어노테이션
public class UserServiceController {
    @GetMapping("/test")
    public String test(){
        return "selly-user-service Test gateway:8000, selly-user-service:8081";
    }

    @GetMapping("/message")
    public String message(@RequestHeader("selly-user-request") String header){
        log.info(header);
        return "selly User Service Request";
    }

    // 서버 환경 가져와서 보는 법
    Environment env;

    @Autowired
    public UserServiceController(Environment env){
        this.env =env;
    }

    @GetMapping("/check")
    public String check(HttpServletRequest request){
        log.info("Server port={}", request.getServerPort());

        return String.format("user-service PORT %s", env.getProperty("local.server.port"));
    }
}
