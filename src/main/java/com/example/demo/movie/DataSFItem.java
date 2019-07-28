package com.example.demo.movie;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class DataSFItem {
    String title;
    @JsonProperty("locations")
    String location;
}
