//@ts-check
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const config = require("../config");

const client = new S3Client({
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
  region: config.aws.defaultRegion,
});

/**
 * @param {import('fs').ReadStream} stream
 * @param {string} key
 */
async function putFile(stream, key) {
  const resp = await client.send(
    new PutObjectCommand({
      Bucket: config.aws.bucketName,
      Key: key,
      Body: stream,
    })
  );
  return resp;
}

/**
 * @param {string} key
 * @returns {Promise<import('fs').ReadStream>}
 */
async function getFile(key) {
  const resp = await client.send(
    new GetObjectCommand({
      Bucket: config.aws.bucketName,
      Key: key,
    })
  );
  if (!resp.Body) {
    throw new Error("body not found on resp");
  }
  //@ts-expect-error
  return resp.Body;
}

const s3Service = {
  getFile,
  putFile,
};

module.exports = s3Service;
