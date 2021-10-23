
## HOW TO INSTALL THIS APPLICATION
``` RUN
npm install
```
### Grant permission to bash file
```
sudo chmod -R 755 ./start-server.sh
sudo chmod -R 755 ./test.sh
```

## HOW TO START THIS APPLICATION
``` RUN
  ./start-server.sh
```

## HOW TO RUN INTEGRATION TEST
``` RUN
./test.sh
```

## How to test on postman
### The publisher server runs on port 8000
```
curl --location --request POST 'localhost:8000/subscribe/topic1' \
--header 'Authorization: application/json' \
--header 'Content-Type: application/json' \
--data-raw '{
    "url": "http://localhost:9000/test1"
}'
```

```
curl --location --request POST 'localhost:8000/publish/topic1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Mike John",
    "age": 46
}'
```

### The subscription server runs on port 9000
```
curl --location --request POST 'localhost:9000/topic1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Mike John",
    "age": 32
}'
```