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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
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

    http.csrf().disable();
    http.authorizeRequests().antMatchers("/error/**").permitAll()
            .antMatchers("/**")
//            .access("hasIpAddress('127.0.0.1')")
            .permitAll()
            .and()
            .addFilter(getCustomAuthenticationFilter());
    return http.build();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();

    configuration.setAllowedOriginPatterns(Arrays.asList("*"));
    configuration.setAllowedMethods(Arrays.asList("HEAD","POST","GET","DELETE","PUT"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
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
