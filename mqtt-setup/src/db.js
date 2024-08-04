const { setTimeout } = require("timers/promises");

const {
  DynamoDBClient,
  CreateTableCommand,
  DescribeTableCommand,
} = require("@aws-sdk/client-dynamodb");

const {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");

// Hard-code a table name
const tableName = "sensor-data";

const ddbDocClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    // Hard-code a region
    region: "us-east-1",
    endpoint: process.env.DYNAMODB_ENDPOINT_URL,
    credentials: {
      // Use some hard-coded, fake credentials
      accessKeyId: "test",
      secretAccessKey: "test",
    },
  })
);

// Check if a table exists. Returns Promise<boolean>
const tableExists = async () => {
  try {
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/describetablecommand.html
    const res = await ddbDocClient.send(
      new DescribeTableCommand({
        TableName: tableName,
      })
    );
    return !!res.Table;
  } catch (err) {
    return false;
  }
};

// Create a table if necessary
const createTable = async () => {
  try {
    // See if the table already exists
    if (await tableExists()) {
      console.log("Table already exists");
      return;
    }

    console.log("Creating table...");

    // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/createtablecommand.html
    const res = await ddbDocClient.send(
      new CreateTableCommand({
        TableName: "sensor-data",
        BillingMode: "PAY_PER_REQUEST",
        AttributeDefinitions: [
          {
            AttributeName: "deviceId",
            AttributeType: "S", // string
          },
          {
            AttributeName: "recordedTimestamp",
            AttributeType: "S", // number
          },
        ],
        KeySchema: [
          {
            AttributeName: "deviceId",
            KeyType: "HASH", // partition key
          },
          {
            AttributeName: "recordedTimestamp",
            KeyType: "RANGE", // sort key
          },
        ],
      })
    );
    console.log("Created sensor-data table", res.TableDescription);
    return true;
  } catch (err) {
    console.error("Unable to create sensor-data table", err.message);
    return false;
  }
};

// Insert a new temperature reading item in the table
const addReading = async (deviceId, recordedTimestamp, power) => {
  try {
    await ddbDocClient.send(
      new PutCommand({
        TableName: tableName,
        Item: {
          deviceId,
          recordedTimestamp,
          power,
        },
      })
    );
    console.log("Added new reading to db", {
      deviceId,
      recordedTimestamp,
      power,
    });
  } catch (err) {
    console.error("Unable to add new reading", err);
  }
};

// Create our query params
const buildQueryParams = (deviceId, { limit }) => {
  let params = {
    TableName: tableName,
    // Value for the Partition Key, see:
    // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html#Query.KeyConditionExpressions
    KeyConditionExpression: "deviceId = :deviceId",
    ExpressionAttributeValues: {
      ":deviceId": deviceId,
    },
    // Return in Descending order
    ScanIndexForward: false,
  };
  if (typeof limit === "number" && limit > 0) {
    params.Limit = limit;
  }

  return params;
};

// Query for all temperature readings for a given device
const getReadings = async (deviceId, { limit }) => {
  const params = buildQueryParams(deviceId, { limit });
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/querycommand.html
  const command = new QueryCommand(params);

  try {
    const res = await ddbDocClient.send(command);
    return res.Items;
  } catch (err) {
    console.log(err);
  }
};

module.exports.init = async () => {
  // Wait for DynamoDB Local to become ready, which can take a few seconds
  if (!(await createTable())) {
    console.warn("Unable to initialize DynamoDB, retrying...");
    await setTimeout(1000);
    return module.exports.init();
  }
};
module.exports.addReading = addReading;
module.exports.getReadings = getReadings;
