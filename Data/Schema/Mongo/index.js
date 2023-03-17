import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

try {
    // Connect to MongoDB
    mongoose.connect(process.env.DB_MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('Connected to MongoDB');
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
}

export default mongoose.connection;
