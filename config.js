import * as dotenv from "dotenv";

dotenv.config();

const ENV_VARIABLES = process.env;

const KAFKA_CONFIG = {
  clientId: "my-app",
  brokers: JSON.parse(ENV_VARIABLES["KAFKA_BROKERS"]),
  enforceRequestTimeout: false,
};

if (JSON.parse(ENV_VARIABLES["KAFKA_MECHANISM_SASL"])) {
  KAFKA_CONFIG["ssl"] = true;
  KAFKA_CONFIG["sasl"] = {
    mechanism: ENV_VARIABLES["KAFKA_CONSUMER_MECHANISM"],
    username: ENV_VARIABLES["KAFKA_USERNAME"],
    password: ENV_VARIABLES["KAFKA_PASSWORD"],
  };
}

const FILE_PATH = ENV_VARIABLES["FILE_PATH"];

export { KAFKA_CONFIG, ENV_VARIABLES, FILE_PATH };
