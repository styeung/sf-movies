package com.example.demo.movie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MoviesController {

    @Autowired
    MoviesService moviesService;

    @GetMapping("/movies")
    public List<Movie> getMovies() {
        return moviesService.getMovies();
    }
}
