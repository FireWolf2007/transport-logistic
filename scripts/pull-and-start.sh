docker-compose -f docker/route-and-timing-service.yml down
docker pull firewolf2007/transport-logistic-timingservice:latest
docker pull firewolf2007/transport-logistic-routeservice:latest
docker-compose -f docker/route-and-timing-service.yml up