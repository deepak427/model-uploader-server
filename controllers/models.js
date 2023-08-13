import fs from 'fs';
import pkg from 'aws-sdk';
import UploadedModel from '../models/model.js';
import dotenv from "dotenv"

dotenv.config();
const { S3 } = pkg;

const s3 = new S3({
  accessKeyId: "",
  secretAccessKey: "",
  region: "us-east-1",
  endpoint: "s3.wasabisys.com",
  signatureVersion: "v4",
  httpOptions: {
    timeout: 3600000, 
  },
});

export const uploadModel = async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const { title, description } = req.body;

    const fileStream = fs.createReadStream(path);

    const params = {
      Bucket: "meditaion-scenes",
      Key: originalname,
      Body: fileStream,
    };

    const s3Response = await s3.upload(params).promise();

    const uploadedModel = new UploadedModel({
      originalName: originalname,
      title,
      description,
      url: s3Response.Location,
    });

    await uploadedModel.save();

    await fs.promises.unlink(path);

    res.status(200).json({ message: "Model uploaded successfully" });
  } catch (error) {
    console.error("Error uploading model:", error);
    res
      .status(500)
      .json({ error: "An error occurred while uploading the model" });
  }
};

export const getModels = async (req, res) => {
  try {
    const uploadedAllModels = await UploadedModel.find();
    const modelUrls = uploadedAllModels.map(file => {
      const presignedUrl = s3.getSignedUrl('getObject', {
        Bucket: 'meditaion-scenes',
        Key: file.originalName,
        Expires: 3600, 
      });
      return presignedUrl;
    });
    res.status(200).json(modelUrls);
  } catch (error) {
    console.error('Error fetching model URLs:', error);
    res.status(500).json({ error: 'An error occurred while fetching model URLs' });
  }
}
