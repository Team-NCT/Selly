package com.b102.sellyuserservice.security;

import com.b102.sellyuserservice.domain.dto.UserDto;
import com.b102.sellyuserservice.model.service.UserService;
import com.b102.sellyuserservice.vo.RequestLogin;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.rsocket.RSocketSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Key;
import java.util.ArrayList;
import java.util.Date;

@Slf4j
//@RequiredArgsConstructor
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

  private UserService userService;
  private Environment env;
  private final Key key;
  public CustomAuthenticationFilter(AuthenticationManager authenticationManager,
                              UserService userService,
                              Environment env) {
    super.setAuthenticationManager(authenticationManager);
    this.userService = userService;
    this.env = env;
    byte[] keyBytes = Decoders.BASE64.decode(env.getProperty("token.secret"));
    this.key = Keys.hmacShaKeyFor(keyBytes);
  }
  @Override
  public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
    try {
      RequestLogin creds = new ObjectMapper().readValue(request.getInputStream(), RequestLogin.class);
      return getAuthenticationManager().authenticate(
              new UsernamePasswordAuthenticationToken(
                      creds.getWallet(),
                      creds.getPwd(),
                      new ArrayList<>()
              )
      );
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
    String wallet = ((User)authResult.getPrincipal()).getUsername();
    UserDto userDetails = userService.getUserDetailsByWallet(wallet);
    String token = Jwts.builder()
            .setSubject(userDetails.getUserId())
            .setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(env.getProperty("token.expiration_time"))))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();
    response.addHeader("token", token);
    response.addHeader("userId", userDetails.getUserId());


  }
}
