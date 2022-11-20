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
FHIRTENANTID=
FHIRCLIENTID=
FHIRCLIENTSECRET=
FHIRSUBSCRIPTIONID=
FHIRSERVER=
PATIENT=**NHS Number, e.g. test NHS Number like 9000000009**
XAPIKEY=**key value, e.g. AWS FHIR Works developer key**
AUTH_TOKEN=**oauth token**
AUTH_TOKEN_PDS=
XAPIKEY_PDS=
PDSENDPOINT=https://sandbox.api.service.nhs.uk/personal-demographics/FHIR/R4
SSODOMAIN=
SSOISSUER=
SSOCLIENTID=
SSOCLIENTSECRET
SSOCALLBACKURL=
PASSPORTSECRET=
AUTHENTICATE=true/false
HSTS=true/false
HSTS_MAXAGES=seconds
HSTS_INCLUDESUBDOMS=true/false
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

## Making contributions
1) Create branch in GitHub project

2) Locally
```
    $git pull
    $git checkout <branch name>
```
4) Make changes to code and other files as required

5) Once you are happy with your changes and have run an manually tested them, npm test to run test pack before you commit

6) Commit changes
```
    $git add .
    $git commit . -m <"commit message">
    $git push
```
7) Return to GitHub and create Pull Request

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
