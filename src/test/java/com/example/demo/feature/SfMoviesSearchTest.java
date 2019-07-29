package com.example.demo.feature;

import com.example.demo.ChromeHeadlessTest;
import com.example.demo.config.MockRestTemplateConfiguration;
import org.fluentlenium.core.domain.FluentWebElement;
import org.fluentlenium.core.hook.wait.Wait;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@Wait
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Import(MockRestTemplateConfiguration.class)
public class SfMoviesSearchTest extends ChromeHeadlessTest {
    @LocalServerPort
    private int port;

    private final String domainPrefix = "http://localhost:";

    @Test
    public void searchJourneyTest() {
        goTo(domainPrefix + Integer.toString(port));
        whenIEnterTheLetterA();
        thenISeeOptionsStartingWithA();

        whenIClickOnTheFirstMovie();
        thenISeeItsLocationsListed();
        thenISeeTheLocationMarkersPlaced();
    }

    private void thenISeeTheLocationMarkersPlaced() {
        List<FluentWebElement> markers = $("img[src='https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png']");
        assertThat(markers.size()).isGreaterThan(0);
    }

    private void thenISeeItsLocationsListed() {
        List<FluentWebElement> locations = $("[data-test='location-option']");
        assertThat(locations.size()).isGreaterThan(0);
    }

    private void whenIClickOnTheFirstMovie() {
        FluentWebElement firstOption = $("[data-test='option']").first();
        firstOption.click();
    }

    private void thenISeeOptionsStartingWithA() {
        List<FluentWebElement> options = $("[data-test='option']");
        assertThat(options.size()).isGreaterThan(0);
    }

    private void whenIEnterTheLetterA() {
        FluentWebElement searchInput = $("[data-test='search-input']").first();
        searchInput.fill().withText("a");
    }
}
