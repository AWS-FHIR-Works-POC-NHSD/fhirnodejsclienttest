# fhirnodejsclienttest

Install the usual way

1) clone it locally

2) install it

$ npm install

3) configure it.  Create a .env file in root folder with the following

```
HOSTNAME=https://www.example.com
PORT=443
PATIENT=6998939
XAPIKEY=**key value, e.g. AWS FHIR Works developer key**
AUTH_TOKEN=**oauth token**
```

4) run it

$ node app.js

or 

$ nodemon app.js

5) access it via web browser 

http://localhost:3000/