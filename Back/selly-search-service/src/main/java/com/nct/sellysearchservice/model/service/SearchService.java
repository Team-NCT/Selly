package com.nct.sellysearchservice.model.service;

import java.util.List;

public interface SearchService {
  List<Object> filter(String sell, String auction);
}
