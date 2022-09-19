
https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

docker build . -t grahamd99/fhirnodejsclienttest

docker run -p 49160:3000 -d grahamd99/fhirnodejsclienttest

docker logs 97474ff88b94 

docker exec -it 97474ff88b94 /bin/bash

docker kill 97474ff88b94 