const mongoose = require('mongoose');

Module.exports = async function connectDb(){
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected');
    }catch (e){
        console.error('DB conn error:',e.message);
        process.exit(1);
    }
};