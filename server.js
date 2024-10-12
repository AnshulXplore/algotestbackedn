const express = require('express');
const app = express();
const connectMongo = require('./db'); // MongoDB connection function
const createStrategy = require('./controller/strategy/simplestrategyController');
const createAdvanceStrategy = require('./controller/strategy/advanceStrategyController');
const createLegs = require('./controller/legs/simplelegController');

// MongoDB connection setup
(async () => {
    try {
        // MongoDB से कनेक्ट करें
        const db = await connectMongo(); // सही नाम 'connectMongo'
        app.locals.db = db; // कनेक्शन को app.locals में स्टोर करें

        // Middlewares and Routes setup
        app.use(express.json()); // JSON body को parse करेगा

        // API Routes
        app.use('/api', createStrategy);
        app.use('/api', createLegs);
        app.use('/api', createAdvanceStrategy);

        // Server शुरू करें
        app.listen(3000, () => {
            console.log("Server started successfully on port 3000");
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
})();
