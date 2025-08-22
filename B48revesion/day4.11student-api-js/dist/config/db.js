"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = require("mongoose");
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/studentdb";
        await (0, mongoose_1.connect)(mongoURI);
        console.log(" MongoDB connected successfully");
    }
    catch (error) {
        console.error(" MongoDB connection failed", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
