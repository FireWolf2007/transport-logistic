#!/bin/sh

cd ../timing-service
gradle clean
yarn webpack:prod
gradle bootRepackage -Pprod buildDocker
docker tag timingservice:latest firewolf2007/transport-logistic-timingservice:latest
#docker push hub.docker.com:4567/firewolf2007/transport-logistic-timingservice:latest

cd ../route-service
gradle clean
yarn webpack:prod
gradle bootRepackage -Pprod buildDocker
docker tag routeservice:latest firewolf2007/transport-logistic-routeservice:latest
#docker push hub.docker.com:4567/firewolf2007/transport-logistic-routeservice:latest
