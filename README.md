# SF Movies
This app allows you to search for a movie and see if it was filmed in
San Francisco.

API Source: DataSF (https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am)

## Public site
https://sf-movies.cfapps.io/

## Running the app locally
### Requirements
* Java 1.8
* Node 8.4.0+
* Maven

### Run the app
1. Get a Google Maps API key and set the value to `GOOGLE_MAPS_APIKEY` in your environment
1. `npm install`
1. `npm run build` (for production) `npm run dev-build` or `npm run watch` (for dev)
1. `mvn clean spring-boot:run`
1. Visit `http://localhost:8080`

## Running Tests
### Requirements
* Chrome headless

### Run the tests
* Build the app: `npm run build` or `npm run dev-build` or `npm run watch`
* Feature and Backend tests: `mvn clean test`
* Frontend tests: `npm run jasmine`

## Technical Notes
* Built using Spring Boot (app scaffold generated via start.spring.io)
* Frontend built using React
* Webpack used for transpiling and module bundling
* Written by me: all backend code within `/src/` and all frontend code within `/webapp`,
along with some config files at the top level (e.g. webpack.config.js)
* Follows a Controller-Service-Repository-Client architecture pattern
* Movie data is retrieved via our backend for data reformatting. Currently, the app 
calls out to the DataSF API assuming that updates occur, but theoretically this
architecture allows for caching
* Backend journey tests and controller tests are both integration tests that avoid stubbing
* Frontend tests use [Testing Library](https://testing-library.com/docs/intro). Tests are integration-y
in the sense that there is minimal stubbing of components
* Both implementation and test code are run through webpack + babel for ES6 transpilation
* A stub of the dataset is used for tests to avoid unnecessarily hitting the DataSF API (see: `MockRestTemplateConfiguration.java`)
* Styling is done using Object-Oriented CSS principles in which structure styles (e.g. padding) and skins styles (e.g. font-color)
are separated. Classes are self descriptive, which helps avoid too much context switching.
* Google Maps JS API is used for map creation as well as for Places Query (since the locations in the dataset are not in lat/lng)
* App is deployed using Cloud Foundry
