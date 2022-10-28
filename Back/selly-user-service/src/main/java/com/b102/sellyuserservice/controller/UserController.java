package com.b102.sellyuserservice.controller;

import com.b102.sellyuserservice.domain.dto.UserDto;
import com.b102.sellyuserservice.model.service.UserService;
import com.b102.sellyuserservice.vo.RequestUser;
import com.b102.sellyuserservice.vo.ResponseUser;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/selly-user-service")
@Slf4j // log를 쓰기 위한 어노테이션
public class UserController {

    private final UserService userService;
    private final Environment env;

    @Autowired
    public UserController(UserService userService, Environment env){
        this.userService = userService;
        this.env = env;
    }



    @PostMapping("/users")
    public ResponseEntity<ResponseUser> createUser(@RequestBody RequestUser user){
        System.out.println(user);
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        UserDto userDto = mapper.map(user, UserDto.class);
        userService.createUser(userDto);

        ResponseUser responseUser = mapper.map(userDto, ResponseUser.class);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseUser);
    }

    @GetMapping("/users")
    public String test(){
        return "test";
    }



}
