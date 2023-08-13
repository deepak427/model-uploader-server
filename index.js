import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"
import cors from "cors"
import modelRoutes from "./routes/3dModel.js"

const app = express();
app.use(cors());
dotenv.config();

const PORT =  4253;

const DATABASE_URL =  process.env.CONNECTION_URL;

app.get("/", (req, res) => {
  res.send("Welcome to 3D Guided Meditaion API.");
});

app.use('/api', modelRoutes);

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
