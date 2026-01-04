const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");

class FileWatcher extends EventEmitter {
  constructor(dirPath) {
    super();
    this.dirPath = dirPath;
    this.files = new Set(fs.readdirSync(dirPath));
    this.watch();
  }

  watch() {
    fs.watch(this.dirPath, (eventType, filename) => {
      if (!filename) return;

      const filePath = path.join(this.dirPath, filename);
      const exists = fs.existsSync(filePath);

      try {
        if (exists && !this.files.has(filename)) {
          this.files.add(filename);
          this.emit("fileAdded", filename);
        } else if (exists && this.files.has(filename)) {
          this.emit("fileModified", filename);
        } else if (!exists && this.files.has(filename)) {
          this.files.delete(filename);
          this.emit("fileDeleted", filename);
        }
      } catch (err) {
        this.emit("error", err);
      }
    });
  }
}
