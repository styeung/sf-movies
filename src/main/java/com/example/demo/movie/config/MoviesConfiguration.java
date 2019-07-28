package com.example.demo.movie.config;

import com.example.demo.movie.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class MoviesConfiguration {

    @Bean
    public MoviesService getMoviesService(MoviesRepository moviesRepository) {
        return new MoviesServiceImpl(moviesRepository);
    }

    @Bean
    public MoviesRepository getMoviesRepository(MoviesClient moviesClient) {
        return new MoviesRepositoryImpl(moviesClient);
    }

    @Bean
    public MoviesClient getMoviesClient(RestTemplate restTemplate) {
        return new MoviesClientImpl(restTemplate);
    }

    @Bean
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
}
