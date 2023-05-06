import { Kafka, Partitioners } from "kafkajs";
import { KAFKA_CONFIG, ENV_VARIABLES } from "./config.js";
import { data } from "./read-file.js";

(async () => {
  const kafka = new Kafka(KAFKA_CONFIG);

  const producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner,
  });
  try {
    await producer.connect();

    if (!data) {
      console.log("Please provide file path with JSON data");
      return await producer.disconnect();
    }

    const jsonData = JSON.parse(data);

    for (const msg of jsonData) {
      if (!(msg["key"] && msg["value"])) {
        console.log("JSON should be in key value format");
        return await producer.disconnect();
      }
      msg["value"] = JSON.stringify(msg["value"]);
    }

    await producer.send({
      topic: ENV_VARIABLES["KAFKA_TOPIC"] || "test-kafka",
      messages: jsonData,
    });

    console.log("Send.........");

    await producer.disconnect();
  } catch (err) {
    console.log(err);
    await producer.disconnect();
  }
})();
