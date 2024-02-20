// Load the SDK for JavaScript
var AWS = require("aws-sdk");
// Set the Region
AWS.config.update({ region: "us-west-2" });

// Create S3 service object
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// Call S3 to list the buckets
// @ts-ignore
s3.listBuckets(function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
});
