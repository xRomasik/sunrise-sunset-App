## DESCRIPTION

Simple web app created to display local sunrise and sunset times.

It uses 3 different APIs. \
1st to get geolocation of searched object (country, city, etc...). \
2nd to get time zone information for this geolocation to be able to handle daylight saving time. \
3rd to get sunrise and sunset times for the geolocation. \
After all this information is fetched, the app then converts 12h format to 24h and adjust the time according to time offset of the time zone. 

## QUICK START

Clone the repository using `git clone`command and the repository link. \
`cd` into cloned repository. \
`npm install` all the dependencies. \
Then use `npm start` to start this app. \
Window in your browser should pop up, if not, open http://localhost:3000 in your browser. \
Choose date and country and find out their sunset&sunrise times!
