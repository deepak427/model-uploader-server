import mongoose from 'mongoose';

const uploadedModelSchema = new mongoose.Schema({
  originalName: String,
  title: String,
  description: String,
  url: String,
  createdAt: { type: Date, default: Date.now },
});

const UploadedModel = mongoose.model('UploadedModel', uploadedModelSchema);

export default UploadedModel;
