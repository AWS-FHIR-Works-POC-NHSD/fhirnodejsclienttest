# fhirnodejsclienttest

Running locally, two options 

## Run as a full local Node.js application

Install the usual way

1) clone repository locally

2) install it

```
npm install
```

3) configure it.  Create a .env file in root folder with the following

```
HOSTNAME=https://www.example.com
PORT=443
PATIENT=**NHS Number, e.g. test NHS Number like 9000000009**
XAPIKEY=**key value, e.g. AWS FHIR Works developer key**
AUTH_TOKEN=**oauth token**
AUTH_TOKEN_PDS=
XAPIKEY_PDS=
SSODOMAIN=
SSOISSUER=
SSOCLIENTID=
SSOCLIENTSECRET
SSOCALLBACKURL=
PASSPORTSECRET=
```

4) run it

```
node ./server.js
```

or 

```
nodemon ./server.js
```

5) access it via web browser 

http://localhost:3000/

## Docker

1) clone repository locally

2) build local Docker image

```
docker build . -t fhirnodejsclienttest
```

3) start container

```
docker run -p 3000:3000 -d -e HOSTNAME=http://server.fire.ly -e PORT=80 -e XREQUESTID=60E0B220-8136-4CA5-AE46-1D97EF59D068 -e XCORRELATIONID=11C46F5F-CDEF-4865-94B2-0EE0EDCC26DA fhirnodejsclienttest 
```

4) access it via web browser 

http://localhost:3000/
