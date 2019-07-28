package com.example.demo.movie;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.List;

public class MoviesClientImpl implements MoviesClient {
    private RestTemplate restTemplate;
    public final String SOURCE_URL = "https://data.sfgov.org/resource/wwmu-gmzc.json";

    public MoviesClientImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public List<DataSFItem> getDataSFMovieLocations() {
        ResponseEntity<List<DataSFItem>> response = restTemplate.exchange(
                SOURCE_URL,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<DataSFItem>>(){});
        return response.getBody();
    }
}
