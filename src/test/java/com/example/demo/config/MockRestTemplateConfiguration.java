package com.example.demo.config;

import org.apache.commons.io.FileUtils;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.charset.Charset;

import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

@TestConfiguration
public class MockRestTemplateConfiguration {
    @Bean
    @Primary
    public RestTemplate getMockRestTemplate() throws IOException, URISyntaxException {
        RestTemplate restTemplate = new RestTemplate();
        MockRestServiceServer server = MockRestServiceServer.createServer(restTemplate);
        URL resource = this.getClass().getResource("/stubs/sf_movie_locations.json");
        File stubJson = new File(resource.toURI());
        String response = FileUtils.readFileToString(stubJson, Charset.defaultCharset());

        server.expect(requestTo("https://data.sfgov.org/resource/wwmu-gmzc.json"))
                .andRespond(withSuccess(response, MediaType.APPLICATION_JSON));

        return restTemplate;
    }
}
