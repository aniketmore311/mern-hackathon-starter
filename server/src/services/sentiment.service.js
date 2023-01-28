//@ts-check
const {
  ComprehendClient,
  DetectSentimentCommand,
} = require("@aws-sdk/client-comprehend");
const config = require("../config");

const client = new ComprehendClient({
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
  region: config.aws.defaultRegion,
});

/**
 * @param {string} text
 * @returns {Promise<string>}
 */
async function detectSentiment(text) {
  const command = new DetectSentimentCommand({
    LanguageCode: "en",
    Text: text,
  });
  const resp = await client.send(command);
  const sentiment = resp.Sentiment;
  if (!sentiment) {
    throw new Error("sentiment not received");
  }
  return sentiment;
}

const sentimentService = {
  detectSentiment,
};

module.exports = sentimentService;
