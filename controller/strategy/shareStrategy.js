const express = require("express");
const router = express.Router();
const sendResponse=require('../helper/helper')
const checkLegsValidation=require('../conditions/checkadvanceleg');
const fetchUser=require('../../middleware/fetchUser')
const creditChecker=require('../../middleware/creditChecker')

// Share Strategy Route
router.post('/shareStrategy', fetchUser, creditChecker, async (req, res) => {
    try {
        // Function to get the current date and time in "YYYY-MM-DD, HH:MM:SS" format
        function getCurrentDateTime() {
            const now = new Date();

            const day = String(now.getDate()).padStart(2, '0'); // Day with leading zero
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Month (0-indexed)
            const year = now.getFullYear(); // Full year

            const hours = String(now.getHours()).padStart(2, '0'); // Hours with leading zero
            const minutes = String(now.getMinutes()).padStart(2, '0'); // Minutes with leading zero
            const seconds = String(now.getSeconds()).padStart(2, '0'); // Seconds with leading zero

            const date = `${year}-${month}-${day}`; // Date format: YYYY-MM-DD
            const time = `${hours}:${minutes}:${seconds}`; // Time format: HH:MM:SS

            return `Date: ${date}, Time: ${time}`; // Combined date and time string
        }

        function generateUniqueString(length = 10) {
            // Allowed characters: uppercase, lowercase, numbers, and special characters
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$%&*!#';
            let result = '';
            const charactersLength = characters.length;
        
            // Generate a random string
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charactersLength);
                result += characters.charAt(randomIndex);
            }
        
            return result;
        }
        
        // Example usage
        const uniqueString = generateUniqueString();
        let savedata = {}; // Object to store strategy details
        let email = req.userData.email; // Extract user email from token
        let userId = req.userData.userId; // Extract user ID from token
        let date = getCurrentDateTime(); // Get current date and time

        // Destructuring strategy details from the request body
        let { strategyName, to, strategyType } = req.body;

        if(email===to){
            return sendResponse(res,400,"please seelct a other user",null,false)
        }

        const db = req.app.locals.db; // Access database instance
        const SharedStrategy = db.collection('SharedStrategy'); // Shared strategy collection
        const Simple = db.collection("simpleStrategy"); // Simple strategy collection
        const Advance = db.collection('advancestrategy'); // Advance strategy collection

        // Validate if all required fields are provided
        if (!strategyName || !to || !strategyType) {
            return sendResponse(res, 400, "Missing required field in body", null, false);
        }
    

        // Check strategy type and fetch the corresponding strategy
        if (strategyType === "simple") {
            let findsimple = await Simple.findOne({ strategyName: strategyName, user: userId });

            // If strategy not found, return error
            if (!findsimple ) {
                return sendResponse(res, 400, "Strategy Not found", null, false);
            }
            savedata.strategy = findsimple; // Save the strategy in savedata
        } else {
            let findsimple = await Advance.findOne({ strategyName: strategyName, user: userId });

            // If strategy not found, return error
            if (!findsimple) {
                return sendResponse(res, 400, "Strategy Not found", null, false);
            }
            savedata.strategy = findsimple; // Save the strategy in savedata
        }

        // Save other necessary details
        savedata.from = email;
        savedata.to = to;
        savedata.sendingTime = date;
        savedata.strategyType = strategyType;
        savedata.status="specificUser"
        savedata.StrategyCode=uniqueString;

        // Insert shared strategy data into the collection
        let insertData = await SharedStrategy.insertOne(savedata);

        // Send success response
        return sendResponse(res, 200, "Strategy shared successfully", insertData, true);

    } catch (error) {
        // Handle any unexpected error
        return sendResponse(res, 500, error.message, null, false);
    }
});

// All Strategies Sent Route:-
router.post('/strategySent', fetchUser, async (req, res) => {
    try {
        const db = req.app.locals.db; // Access database instance
        const SharedStrategy = db.collection('SharedStrategy'); // Shared strategy collection
        let email = req.userData.email; // Extract user email from token

        // Find all strategies sent by the user
        let findStrategy = await SharedStrategy.find({ from: email }).toArray();

        // If no strategy found, return error
        if (findStrategy.length <= 0) {
            return sendResponse(res, 400, "Sent strategy not found!", null, false);
        }

        // Send success response with the found strategies
        return sendResponse(res, 200, "Strategies retrieved successfully", findStrategy, true);

    } catch (error) {
        // Handle any unexpected error
        return sendResponse(res, 500, error.message, null, false);
    }
});

// Received Strategies Details Route
router.post('/strategyReceived', fetchUser, async (req, res) => {
    try {
        const db = req.app.locals.db; // Access database instance
        const SharedStrategy = db.collection('SharedStrategy'); // Shared strategy collection
        let email = req.userData.email; // Extract user email from token

        // Find all strategies received by the user
        let findStrategy = await SharedStrategy.find({ to: email }).toArray();

        // If no strategy found, return error
        if (findStrategy.length <= 0) {
            return sendResponse(res, 400, "Received strategy not found!", null, false);
        }

        // Send success response with the found strategies
        return sendResponse(res, 200, "Strategies retrieved successfully", findStrategy, true);

    } catch (error) {
        // Handle any unexpected error
        return sendResponse(res, 500, error.message, null, false);
    }
});

// deleat shareSTrategyROute:-
router.post('/deleatStrategy',fetchUser,async(req,res) => {
    try{
    let {code}=req.body;
    const db = req.app.locals.db; // Access database instance
    const SharedStrategy = db.collection('SharedStrategy'); // Shared strategy collection
    let email=req.userData.email;
    let findSharedStartehy=await SharedStrategy.findOne({StrategyCode:code}) 
    if(!findSharedStartehy){
        return sendResponse(res,400,"strategy Not Found",null,false)
    }
    if(email==findSharedStartehy.from){
        let update=await SharedStrategy.updateOne({StrategyCode:code},
            {$set:{from:""}}
        )
    }
    if(email==findSharedStartehy.to){
        let update=await SharedStrategy.updateOne({StrategyCode:code},
            {$set:{to:""}}
        )
    }

    let findForDeleat=await SharedStrategy.findOne({StrategyCode:code})
    if(findForDeleat.from=="" && findForDeleat.to==""){
        let deleat=await SharedStrategy.deleteOne({StrategyCode:code})
    }
    return sendResponse(res,200,"succesfullt deleted",findForDeleat,true)
}catch(error){
    return sendResponse(res, 500, error.message, null, false);
}
    
})

module.exports = router; // Export the router
