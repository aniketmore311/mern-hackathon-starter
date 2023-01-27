//@ts-check
const { getEnvOrDefault } = require("./utils");

//@ts-check
const config = {
  NODE_ENV: getEnvOrDefault("NODE_ENV", "development"),
  app: {
    port: getEnvOrDefault("PORT", "8080"),
    mongoURI: getEnvOrDefault("MONGO_URI"),
    host: "localhost",
    secretkey: getEnvOrDefault("SECRET_KEY"),
    accessTokenExpiresInStr: "7d",
  },
};

module.exports = config;
