package com.nct.sellytradeservice.error;

import feign.Response;
import feign.codec.ErrorDecoder;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class FeignErrorDecoder implements ErrorDecoder {

  @Override
  public Exception decode(String methodKey, Response response) {
    switch (response.status()) {
      case 400:
        break;
      case 500:
        if (methodKey.contains("getOwnership")) {
          return new ResponseStatusException(HttpStatus.valueOf(response.status()),
                  "존재하지 않는 소유권입니다.");
        }
        break;
      default:
        return new Exception(response.reason());
    }
    return null;
  }
}
