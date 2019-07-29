package com.example.demo;

import org.fluentlenium.adapter.junit.FluentTest;
import org.openqa.selenium.Capabilities;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;

public class ChromeHeadlessTest extends FluentTest {

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
