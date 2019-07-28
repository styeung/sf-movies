package com.example.demo;

import org.apache.commons.io.FileUtils;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.net.URL;
import java.nio.charset.Charset;

import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class MoviesControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private RestTemplate restTemplate;
    private MockRestServiceServer server;

    @Before
    public void setUp() throws Exception {
        this.server = MockRestServiceServer.createServer(restTemplate);
        URL resource = this.getClass().getResource("/stubs/sf_movie_locations.json");
        File stubJson = new File(resource.toURI());
        String response = FileUtils.readFileToString(stubJson, Charset.defaultCharset());

        this.server.expect(requestTo("https://data.sfgov.org/resource/wwmu-gmzc.json"))
                .andRespond(withSuccess(response, MediaType.APPLICATION_JSON));
    }

    @Test
    public void getMovies_returnsAListOfMovies() throws Exception {
        this.mockMvc.perform(get("/movies"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(greaterThan(1))))
                .andExpect(jsonPath("$[0].name").isString())
                .andExpect(jsonPath("$[0].locations").isArray())
                .andExpect(jsonPath("$[0].locations[0]").isString());
    }
}