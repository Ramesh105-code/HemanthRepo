const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload', upload.single('myfile'), async (req, res) => {
  try {
    const localPath = req.file.path;
    const cloudResult = await cloudinary.uploader.upload(localPath);

    fs.unlinkSync(localPath);

    res.status(200).json({
      message: 'file uploaded successfully',
      imageUrl: cloudResult.secure_url,
    });
  } catch (error) {
    res.status(500).json({ error: 'upload failed', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
