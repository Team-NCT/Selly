package com.b102.sellyuserservice.security;

import com.b102.sellyuserservice.model.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import java.util.logging.Filter;

@Configuration
@EnableWebSecurity
//@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurity {
  private Environment env;
  private BCryptPasswordEncoder bCryptPasswordEncoder;
  private UserService userService;

  @Autowired
  private AuthenticationConfiguration authenticationConfiguration;
  @Bean
  AuthenticationManager authenticationManager(AuthenticationConfiguration authConfiguration) throws Exception {
    return authConfiguration.getAuthenticationManager();
  }

  public WebSecurity(Environment env, UserService userService, BCryptPasswordEncoder bCryptPasswordEncoder) {
    this.env = env;
    this.userService = userService;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
//    http.csrf().disable()
//            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//            .and()
//            .authorizeRequests()
//            .anyRequest().authenticated()
//            .and()
//            .addFilter(new CustomAuthenticationFilter());
//    return http.build();
    http.csrf().disable();
//    http.authorizeRequests().antMatchers("/users/**").permitAll();
    http.authorizeRequests().antMatchers("/**")
            .hasIpAddress("192.168.219.102")
            .and()
            .addFilter(getCustomAuthenticationFilter());
    return http.build();
  }

  private CustomAuthenticationFilter getCustomAuthenticationFilter()  throws Exception{
    CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManager(authenticationConfiguration), userService, env);
    return customAuthenticationFilter;
  }



//  @Bean
//public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//  http.authorizeRequests()
//          .antMatchers("/**")
//          .permitAll()
//          .anyRequest()
//          .authenticated()
//          .and()
//          .httpBasic();
//  http.addFilterAfter(new CustomFilter(), BasicAuthenticationFilter.class);
//  return http.build();
//}


}
