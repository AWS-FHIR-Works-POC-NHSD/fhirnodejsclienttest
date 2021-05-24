# fhirnodejsclienttest

Install the usual way

1) clone it locally

2) install it

$ npm install

3) configure it.  Create a .env file in root folder with the following

HOSTNAME=https://www.example.com<br>
PORT=443<br>
XAPIKEY=**key value, e.g. AWS FHIR Works developer key**<br>
AUTH_TOKEN=**oauth token**<br>

4) run it

$ node app.js

or 

$ nodemon app.js

5) access it via web browser 

http://localhost:3000/