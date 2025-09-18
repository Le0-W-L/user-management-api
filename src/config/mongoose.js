const mongoose = require('mongoose');
require('dotenv').config();

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected!');
    }
    catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

module.exports = connectMongo;