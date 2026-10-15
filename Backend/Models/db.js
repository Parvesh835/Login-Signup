const mongoose = require('mongoose');

const ConnectDb = async () => {
    const mongoUrl = process.env.MongoDb_URL;
    if (!mongoUrl) {
        throw new Error('MongoDb_URL environment variable is required');
    }

    await mongoose.connect(mongoUrl);
    console.log('MongoDb connected successfully');
}

module.exports = ConnectDb;