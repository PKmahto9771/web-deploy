import { S3 } from "aws-sdk";
import fs from "fs";
require('dotenv').config();

const s3 = new S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    endpoint: process.env.S3_ENDPOINT
});


// fileName => output/12312/src/App.jsx
// filePath => /Users/harkiratsingh/web-deploy/dist/output/12312/src/App.jsx
export const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "quickdeploy",
        Key: fileName,
    }).promise();
    console.log(response);
}