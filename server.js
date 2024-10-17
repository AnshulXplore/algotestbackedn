const express = require('express');
const app = express();
const connectMongo = require('./db'); // MongoDB connection function
const createStrategy = require('./controller/strategy/simplestrategyController');
const createAdvanceStrategy = require('./controller/strategy/advanceStrategyController');
const createLegs = require('./controller/legs/simplelegController');
const bucketController = require('./controller/bucket/bucketController'); // Ensure this file exports a router
const auth=require('./controller/auth/authentiocation')
const backtestReasult=require('./controller/backtestreasult/strategyBacktest')

app.use((err, req, res, next) => {
    console.error(err.stack); // पूरी त्रुटि स्टैक को लॉग करें
    res.status(500).send('Something broke!');
});

// MongoDB connection setup
(async () => {
    try {
        const db = await connectMongo(); 
        app.locals.db = db; 

        // Middlewares and Routes setup
        app.use(express.json()); 

        // API Routes
        app.use('/api', createStrategy);
        app.use('/api', createLegs);
        app.use('/api', createAdvanceStrategy);
        app.use('/api', bucketController); // Ensure bucketController is included
        app.use('/api',auth)
        app.use('/api',backtestReasult)

        app.listen(3000, () => {
            console.log("Server started successfully on port 3000");
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
})();














// const express = require('express');
// const app = express();
// const connectMongo = require('./db'); // MongoDB connection function
// const createStrategy = require('./controller/strategy/simplestrategyController');
// const createAdvanceStrategy = require('./controller/strategy/advanceStrategyController');
// const createLegs = require('./controller/legs/simplelegController');
// const bucketController=require('./controller/bucket/bucketController')
// // MongoDB connection setup
// (async () => {
//     try {
        
//         const db = await connectMongo(); 
//         app.locals.db = db; 

//         // Middlewares and Routes setup
//         app.use(express.json()); 

//         // API Routes
//         app.use('/api', createStrategy);
//         app.use('/api', createLegs);
//         app.use('/api', createAdvanceStrategy);
//         app.use('/api',bucketController)

        
//         app.listen(3000, () => {
//             console.log("Server started successfully on port 3000");
//         });
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error.message);
//     }
// })();
