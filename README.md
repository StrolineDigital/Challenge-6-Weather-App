# Sublime Weather
A stylish web app for checking both local and global weather
## Description
The Sublime weather app takes user input for a desired city and displays the current weather as well as the 5 day forecast for that city. The current day card displays the location, the date, and the current weather event along with an icon corresponding to that event, plus temperature, wind, and humidity. The 5 day forecast displays the date, an icon of the forecasted weather for that day, temperature, wind, and humidity. When the user searches for a city the search results are saved in local storage. The 3 most recent search results will display on the page in the recent searches section. When a user refreshes the page, the 3 most recent searches will remain on the page. Here is what the application looks like ![alt text](<assets/images/Sublime Weather App Screenshot.png>)

## User Story
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

## Acceptance Criteria For This Project
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

## Usage
The user is advised to start by entering the name of a city into the input field so they can find the weather for that city. They are then advised to click the "search" button which will populate the cards on the page with weather data. The large card with the green background is the current weather card and provides information about the current weather at the specified location. The 5 smaller grey cards are for the 5 day forecast (and are labled in a header as such). The user can see an abbreviated name of the day as well as the date for both the current card and the forecast cards. The user is advised that search results will be saved in the "recent searches" section of the application and can be clicked on to review the weather for the recently searched city. Perfect spelling is also not essential as the application will return the search result that best matches the provided user input.
## Credits 
Many helpful tips were found on https://stackoverflow.co/ and https://www.w3schools.com/ All code was written from scratch by Luke Stroehlein with much research involved along the way. Extensive reading of the documentation on the APIs used was necessary to make this application work. API documentation can be found here https://openweathermap.org/api The specific APIs that were pulled from were the current weather, 5 day, and geocoding APIs. The Google fonts API was used to provide the special font on the application.

## In The Future
In the future improvements that could be made upon the app include being able to enter a zip code as well as having the application auto-detect the user's location. While these two things are possible, they were not required for this project, and for the sake of efficiency are being tabled for the oppotunity for future development.

## License
Please refer to LICENSE in the repo.

## Link To Live Page

https://strolinedigital.github.io/Challenge-6-Weather-App/