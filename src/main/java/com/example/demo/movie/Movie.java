package com.example.demo.movie;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class Movie {
    String name;
    List<String> locations;

    public Movie(String name) {
        this.name = name;
        this.locations = new ArrayList<>();
    }
}
