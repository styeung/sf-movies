package com.example.demo.movie;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;
import java.util.stream.Collectors;

public class MoviesRepositoryImpl implements MoviesRepository {
    private MoviesClient moviesClient;

    @Autowired
    public MoviesRepositoryImpl(MoviesClient moviesClient) {
        this.moviesClient = moviesClient;
    }

    public List<Movie> getMovies() {
        List<DataSFItem> items = moviesClient.getDataSFMovieLocations();
        Map<String, Movie> movieMap = titleToMovieMap(items);
        List<Movie> result = new ArrayList<>(movieMap.values());

        return result.stream().filter((item) -> !item.getLocations().isEmpty()).collect(Collectors.toList());
    }

    private Map<String, Movie> titleToMovieMap(List<DataSFItem> items) {
        Map<String, Movie> movieMap = new HashMap<>();

        for(DataSFItem item : items) {
            String movieTitle = item.getTitle();
            Movie movie = movieMap.get(movieTitle);
            if(movie == null) {
                movie = new Movie(movieTitle);
                movieMap.put(movieTitle, movie);
            }

            String location = item.getLocation();
            if(location != null) {
                movie.getLocations().add(location);
            }
        }

        return movieMap;
    }
}
