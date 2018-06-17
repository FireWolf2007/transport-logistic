#!/bin/sh

touch cookies.txt
curl -v -c cookies.txt -b cookies.txt -X POST  -H 'Accept: application/json, text/plain, */*'  \
-H 'Connection: keep-alive' -H 'Content-Type: application/json' \
-H "Authorization: Bearer mytoken123" \
 -d '{"username":"admin","password":"admin"}' \
 'http://127.0.0.1:8081/api/authenticate' > authtoken.data