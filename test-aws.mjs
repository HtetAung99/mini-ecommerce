// // Load the AWS SDK for Node.js
// var AWS = require("aws-sdk");

// // Create S3 service object
// var s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// // call S3 to retrieve upload file to specified bucket
// var uploadParams = {
//   Bucket: "mini-ecommerce",
//   Key: "",
//   Body: "",
// };
// var file = "../mini-ecommerce/README.md";

// // Configure the file stream and obtain the upload parameters
// var fs = require("fs");
// var fileStream = fs.createReadStream(file);
// fileStream.on("error", function (err) {
//   console.log("File Error", err);
// });
// uploadParams.Body = fileStream;
// var path = require("path");

// // call S3 to retrieve upload file to specified bucket
// s3.upload(uploadParams, function (err, data) {
//   if (err) {
//     console.log("Error", err);
//   }
//   if (data) {
//     console.log("Upload Success", data.Location);
//   }
// });
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
const params = {
  Bucket: "mini-ecommerce", // Replace "YOUR_BUCKET_NAME" with the name of your S3 bucket
  Key: "coffeetable.jpg", // Replace "YOUR_OBJECT_KEY" with the key of the object you want to retrieve
};
// const fs = require("fs");
// const path = require("path");

const s3 = new S3Client({ region: "us-west-1" });
const getObject = async () => {
  try {
    // Send the GetObjectCommand and wait for the response
    const { Body } = await s3.send(new GetObjectCommand(params));

    // Process the response body (e.g., convert it to a string)

    // Do something with the object data
    console.log("Retrieved object data:", Body);
  } catch (error) {
    console.error("Error retrieving object:", error);
  }
};

// Utility function to convert a ReadableStream to a string

// Call the getObject function to retrieve the object
getObject();

// s3.getCredentials(function (err) {
//   if (err) console.log(err.stack);
//   // credentials not loaded
//   else {
//     console.log("Access key:", AWS.config.credentials.accessKeyId);
//     console.log(AWS.config);
//   }
// });

// AWS.config.getCredentials(function (err) {
//   if (err) console.log(err.stack);
//   // credentials not loaded
//   else {
//     console.log("Access key:", AWS.config.credentials.);
//   }
// });

// const folderPath = "./public/images";
// const bucketName = "mini-ecommerce";

// fs.readdir(folderPath, (err, files) => {
//   if (err) {
//     console.error("Error reading folder:", err);
//     return;
//   }

//   const imageFiles = files.filter((file) => {
//     const extname = path.extname(file);
//     return [".jpg", ".jpeg", ".png"].includes(extname.toLowerCase());
//   });

//   console.log("Image files in the folder:", imageFiles);

//   imageFiles.forEach((file) => {
//     const filePath = path.join(folderPath, file);
//     const fileContent = fs.readFileSync(filePath);

//     const params = {
//       Bucket: bucketName,
//       Key: file,
//       Body: fileContent,
//     };

//     s3.upload(params, (err, data) => {
//       if (err) {
//         console.error(`Error uploading ${file} to S3:`, err);
//       } else {
//         console.log(`${file} uploaded to S3. URL: ${data.Location}`);
//       }
//     });
//   });
// });
