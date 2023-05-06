# Custom Kafka Publisher

## Local Setup

`docker-compose up -d`

## Create Topic

```
docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic test-kafka
```

## Install

`npm install`

## Configuration

create .env file and copy the variables from the .env.example and change the actually values.

## Run producer

`node producer.js aboslutepath/of/file.json`

## Eventhub Name

[<kafka_broker>:9093]

# Read about confluent refer below link
https://www.confluent.io/blog/kafka-client-cannot-connect-to-broker-on-aws-on-docker-etc/
