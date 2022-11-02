package com.nct.sellysearchservice.model.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

public interface SearchService {
  List<Object> filter(String sell, String auction);

  HashMap<String, Object> getSearchResult(String keyword);
}
