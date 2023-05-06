import { Kafka } from "kafkajs";
import { KAFKA_CONFIG, ENV_VARIABLES } from "./config.js";

(async () => {
  try {
    const kafka = new Kafka(KAFKA_CONFIG);

    const consumer = kafka.consumer({
      groupId: ENV_VARIABLES["KAFKA_GROUP_ID"] || "test",
    });

    await consumer.subscribe({
      topic: ENV_VARIABLES["KAFKA_TOPIC"] || "test-kafka",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        });
      },
    });
  } catch (err) {
    console.log(err);
  }
})();
