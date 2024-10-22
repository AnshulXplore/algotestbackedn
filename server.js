const express = require('express');
const app = express();
const connectMongo = require('./db'); // MongoDB connection function
const simpleStrategy = require('./controller/routes/simpleStrategy');
const createAdvanceStrategy = require('./controller/strategy/advanceStrategyController');
const createLegs = require('./controller/legs/simplelegController');
const bucketController = require('./controller/bucket/bucketController'); // Ensure this file exports a router
const auth=require('./controller/auth/authentiocation')
const backtestReasult=require('./controller/backtestreasult/strategyBacktest')
const reduceCredit=require('./controller/creditScore/credit')
const creditHistory=require('./controller/creditScore/creditHistory')
const shareStrategy=require('./controller/strategy/shareStrategy')

app.use((err, req, res, next) => {
    console.error(err.stack); 
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
        app.use('/api', simpleStrategy);  //CRUD OPREATION OF SIMPLE STRATEGY ROUTES:-
        app.use('/api', createAdvanceStrategy);//CRUD OPREATION OF ADVANCE STRATEGY ROUTES:-
        app.use('/api', bucketController); //CRUD OPREATION OF BUCKET ROUTES:-
        app.use('/api',auth) // AUTHENTICATION ROUTES
        app.use('/api',backtestReasult) // BACKTEST ROUTES
        app.use('/api',reduceCredit) // REDUCE THE CREDIT SCPRE ROUTE
        app.use('/api',creditHistory) // SAVE THE PAYMENT HISTORY AFTER UPDATE THE CREDIT SCORE ROUTE
        app.use('/api',shareStrategy)

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
