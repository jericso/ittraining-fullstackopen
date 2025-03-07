# Part 2

## Data for countries

## Running the application

Follow these steps:

1. Install the node modules with the command `npm install` from cloned application directory.

2. Start the application with the command for your respective system (replace '54l41n3n4v41m34rv0' with your OpenWeather API key):

`export VITE_OPENWEATHER_APIKEY=54l41n3n4v41m34rv0 && npm run dev` // For Linux/macOS Bash
`($env:VITE_OPENWEATHER_APIKEY="54l41n3n4v41m34rv0") -and (npm run dev)` // For Windows PowerShell
`set "VITE_OPENWEATHER_APIKEY=54l41n3n4v41m34rv0" && npm run dev` // For Windows cmd.exe

Note: Application will function without OpenWeather API key but no weather information will be displayed for a country. Failed request will be logged to console.
