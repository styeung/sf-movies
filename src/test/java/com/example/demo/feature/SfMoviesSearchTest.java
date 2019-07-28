package com.example.demo.feature;

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
public class SfMoviesSearchTest extends FluentTest {
    @LocalServerPort
    private int port;

    private final String domainPrefix = "http://localhost:";

    @Test
    public void searchJourneyTest() {
        goTo(domainPrefix + Integer.toString(port));
        whenIEnterTheLetterA();
        thenISeeOptionsStartingWithA();
    }

    private void thenISeeOptionsStartingWithA() {
        List<FluentWebElement> options = $("[data-test='option']");
        assertThat(options.size()).isGreaterThan(0);
    }

    private void whenIEnterTheLetterA() {
        FluentWebElement searchInput = $("[data-test='search-input']").first();
        searchInput.fill().withText("a");
    }

    @Override
    public String getWebDriver(){
        return "chrome";
    }

    @Override
    public Capabilities getCapabilities(){
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--disable-gpu");
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("chromeOptions", options);
        return capabilities;
    }
}
