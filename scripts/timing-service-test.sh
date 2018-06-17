#!/bin/sh

TOKEN=`cat authtoken.data | grep "id_token" | awk -F '"' '{print $4}'`

echo $TOKEN

curl -v -c cookies.txt -b cookies.txt -X POST  -H 'Accept: application/json, text/plain, */*'  \
-H 'Connection: keep-alive' -H 'Content-Type: application/json' \
-H "Authorization: Bearer $TOKEN" -d '[4,3,2,1]' \
 'http://127.0.0.1:8081/api/ext/route-timing'
