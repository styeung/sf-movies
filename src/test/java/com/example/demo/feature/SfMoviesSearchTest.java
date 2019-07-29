package com.example.demo.feature;

import com.example.demo.ChromeHeadlessTest;
import org.fluentlenium.adapter.junit.FluentTest;
import org.fluentlenium.core.domain.FluentWebElement;
import org.fluentlenium.core.hook.wait.Wait;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.Capabilities;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@Wait
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
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
        thenTheOptionsAreHidden();
        thenISeeItsLocationsListed();
    }

    private void thenTheOptionsAreHidden() {
        List<FluentWebElement> options = $("[data-test='option']");
        List<FluentWebElement> visibleOptions = options.stream().filter((option) -> option.displayed())
        assertThat(visibleOptions).isEmpty();
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
