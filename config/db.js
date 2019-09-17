const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// connects to mongo database
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        console.log('MongoDB Connected...')
    } catch(err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;