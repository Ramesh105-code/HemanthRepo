const fs = require("fs");
const path = require("path");

const folderName = "students";


if (!fs.existsSync(folderName)) {
  fs.mkdirSync(folderName);
  console.log(" Folder created:", folderName);
} else {
  console.log(" Folder already exists:", folderName);
}


for (let i = 1; i <= 5; i++) {
  const filePath = path.join(folderName, `student${i}.txt`);
  fs.writeFileSync(filePath, `This is student ${i}`);
  console.log(` File created: student${i}.txt`);
}


const files = fs.readdirSync(folderName);
console.log("\n Reading files...");
files.forEach((file) => {
  const content = fs.readFileSync(path.join(folderName, file), "utf-8");
  console.log(`${file}: ${content}`);
});


files.forEach((file) => {
  fs.unlinkSync(path.join(folderName, file));
  console.log(` Deleted file: ${file}`);
});

fs.rmdirSync(folderName);
console.log(" Folder deleted:", folderName);
