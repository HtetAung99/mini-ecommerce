var { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = new S3Client({ region: "us-west-1" });

var fs = require("fs");
var path = require("path");

const bucketName = "mini-ecommerce";

// // Configure the file stream and obtain the upload parameters
const folderPath = "./public/images";

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("Error reading folder:", err);
    return;
  }

  const imageFiles = files.filter((file) => {
    const extname = path.extname(file);
    return [".jpg", ".jpeg", ".png"].includes(extname.toLowerCase());
  });

  console.log("Image files in the folder:", imageFiles);

  imageFiles.forEach(async (file) => {
    const filePath = path.join(folderPath, file);
    const fileContent = fs.readFileSync(filePath);

    const params = {
      Bucket: bucketName,
      Key: file,
      Body: fileContent,
    };
    try {
      const command = new PutObjectCommand(params);
      const res = await s3.send(command);
      console.log(`${file} uploaded to S3. URL: ${JSON.stringify(res)}`);
    } catch (err) {
      console.error(`Error uploading ${file} to S3:`, err);
    }
  });
});
