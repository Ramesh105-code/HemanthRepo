const express = require("express");
const fs = require("fs");
const readline = require("readline");
const path = require("path");

const app = express();
const PORT = 3000;

let progress = 0;

app.get("/process-csv", async (req, res) => {
  const inputFile = path.join(__dirname, "input.csv");
  const outputFile = path.join(__dirname, "output.csv");

  try {
    const fileSize = fs.statSync(inputFile).size;
    let processedBytes = 0;

    const readStream = fs.createReadStream(inputFile);
    const writeStream = fs.createWriteStream(outputFile);

    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });

    readStream.on("data", (chunk) => {
      processedBytes += chunk.length;
      progress = Math.floor((processedBytes / fileSize) * 100);
    });

    rl.on("line", (line) => {
      writeStream.write(line.toUpperCase() + "\n");
    });

    rl.on("close", () => {
      writeStream.end();
      progress = 100;
    });

    readStream.on("error", (err) => {
      console.error("Read error:", err);
      res.status(500).json({ error: "File read error" });
    });

    writeStream.on("error", (err) => {
      console.error("Write error:", err);
      res.status(500).json({ error: "File write error" });
    });

    res.json({
      message: "File processing started",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/progress", (req, res) => {
  res.json({ progress: `${progress}%` });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
