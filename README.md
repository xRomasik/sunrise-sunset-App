## DESCRIPTION

Simple web app created to display local sunrise and sunset times.

It uses 3 different APIs. \
1st to get geolocation of searched object (country, city, etc...). \
2nd to get time zone information for this geolocation to be able to handle daylight saving time. \
3rd to get sunrise and sunset times for the geolocation. \
After all this information is fetched, the app then converts 12h format to 24h and adjust the time according to time offset of the time zone. 

## QUICK START

Clone the repository using `git clone` command and the repository link. \
`cd` into cloned repository. \
`npm install` all the dependencies. \
Then use `npm start` to start this app. \
Window in your browser should pop up, if not, open http://localhost:3000 in your browser. \
Choose date and country and find out their sunset&sunrise times!

## BACKEND API

Because this app uses 2 APIs, that both need API key, I also created simple sever, that can handle all the API calls mentioned above, so nobody not authorized can't access these keys and use them.\

To make the app compatible with the server it is necessary to open project folder src/pages/homepage/homepage.functions and switch these 2 functions by commenting the 1st one and uncommenting the 2nd one. \

![image](https://user-images.githubusercontent.com/73423557/103469306-59e1bf80-4d63-11eb-9044-c95869d3c432.png)

Also do not forget to remove API_KEY and API_KEY2 arguments from the function call in the homepage.component

![image](https://user-images.githubusercontent.com/73423557/103469358-ed1af500-4d63-11eb-8b66-6337ed51292a.png)

How start up the server is described in the server repository: https://github.com/xRomasik/sunrise-sunset-app-backend
