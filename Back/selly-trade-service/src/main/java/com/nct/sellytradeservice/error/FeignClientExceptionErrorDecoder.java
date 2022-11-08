package com.nct.sellytradeservice.error;

import com.nct.sellytradeservice.client.FeignClientException;
import feign.Response;
import feign.codec.ErrorDecoder;
import feign.codec.StringDecoder;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class FeignClientExceptionErrorDecoder implements ErrorDecoder {
  private static final Logger LOGGER = LoggerFactory.getLogger(FeignClientExceptionErrorDecoder.class);
  private StringDecoder stringDecoder = new StringDecoder();

  @Override
  public FeignClientException decode(final String methodKey, Response response) {
    String message = "Null Response Body.";
    if (response.body() != null) {
      try {
        JSONObject jsonObject = new JSONObject(response.body().toString());
        message = jsonObject.getString("message");
        message = stringDecoder.decode(response, String.class).toString();
      } catch (IOException | JSONException e) {
        LOGGER.error(methodKey + "Error Deserializing response body form failed feign request response.", e);
      }

    }
    return new FeignClientException(response.status(), message, response.headers());
  }
}
