package com.example.demo.movie;

import java.util.List;

public class MoviesServiceImpl implements MoviesService {

    private MoviesRepository moviesRepository;

    public MoviesServiceImpl(MoviesRepository moviesRepository) {
        this.moviesRepository = moviesRepository;
    }

    @Override
    public List<Movie> getMovies() {
        return moviesRepository.getMovies();
    }
}
