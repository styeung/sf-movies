package com.example.demo.movie;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

public class MoviesRepositoryImpl implements MoviesRepository {
    private MoviesClient moviesClient;

    @Autowired
    public MoviesRepositoryImpl(MoviesClient moviesClient) {
        this.moviesClient = moviesClient;
    }

    public List<Movie> getMovies() {
        List<DataSFItem> items = moviesClient.getDataSFMovieLocations();
        Map<String, Movie> movieMap = titleToMovieMap(items);

        return new ArrayList<>(movieMap.values());
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
            movie.getLocations().add(item.getLocation());
        }

        return movieMap;
    }
}
