// controller/bucket/bucketController.js
const express = require("express");
const router = express.Router();
const sendResponse = require('../helper/helper');
const {  ObjectId } = require('mongodb');

//1:- CREATE THE BUCKET ROUTE :-
router.post("/createBucket", async (req, res) => {
    try {

        // DATE FUNCTION 
        function getDates() {
            const today = new Date(); // Aaj ki date
            const lastYear = new Date(); 
            lastYear.setFullYear(today.getFullYear() - 1);
            const formatDate = (date) => {
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                const year = date.getFullYear();
                return `${day}-${month}-${year}`; // DD-MM-YYYY format
            };
            return {
                today: formatDate(today),
                lastYear: formatDate(lastYear),
            };
        }
        
        const startDate=getDates().today
        const endDate=getDates().lastYear;
        
        // DB AND COLLECTION SETUP :-
        const db = req.app.locals.db; 
        const Bucket = db.collection('bucket');
        const simpleStrategy=db.collection('simpleStrategy')
        const advanceStrategy=db.collection('advancestrategy')
        let bucket = req.body;
        // VALIDATIONS :-
        if (!bucket.bucketName) {
            return sendResponse(res, 400, "Please select the name of the bucket", null, false);
        }
        if (!bucket.strategyArray || bucket.strategyArray.length<=0) {
            return sendResponse(res, 400, "Please select at least one strategy to create the bucket", null, false);
        }
        // jwt token
        let user="6510c7a0f64a3b0021d45c11"

        // CHECK THE UNIQUE NAME FOR THE BUCKET :-
        let findBucket=await Bucket.findOne({bucketName:bucket.bucketName})
        if(findBucket){
            return sendResponse(res,400,"please select unique name",null,false);
        }
        // CREATE NEW BUCKET OBJECT:-       
        let newbucket = {
            bucketName: bucket.bucketName,
            strategyArray: await Promise.all(bucket.strategyArray.map(async (strategy, index) => {
                let indexname=null
                let strategyName=null
                
                let findStrategy = await simpleStrategy.findOne({_id:new ObjectId(strategy) })
                if(findStrategy){
                    strategyName=findStrategy.strategyName
                    indexname=findStrategy.index;
                    console.log(findStrategy.strategyName)
                }
                else{
                    let findStrategy = await advanceStrategy.findOne({_id:new ObjectId(strategy)});
                    indexname=findStrategy.index;
                    strategyName=findStrategy.strategyName;
                }
                return {
                    [index]: {
                        strategyId: strategy, 
                        weekends: {Mon:true, Tue:true, WED:true, THU:true, FRI:true},
                        multiplier: 1,
                        Index: indexname,
                        strategyName:strategyName
                    }
                };
            })),
            endDate: startDate,
            startDate: endDate,
            user:user
        };

        
        let createBucket=await Bucket.insertOne(newbucket)

        return sendResponse(res,200,"bucket cretaed succesfully",createBucket,true)

    } catch (error) {
        return sendResponse(res, 500, error.message, null, false);
    }
});

// 2:- UPDATE THE BUCKET ROUTES:-
router.put('/updateBucket', async (req, res) => {
    try {
        const db = req.app.locals.db;
        const Bucket = db.collection('bucket');
        const simpleStrategy = db.collection('simpleStrategy');
        const advanceStrategy = db.collection('advancestrategy');
        
        const { bucketName, strategyArray, endDate, startDate } = req.body;
        const user = "6510c7a0f64a3b0021d45c11"; // JWT token placeholder
        
        let updatedBucket = {};

        // Asynchronous mapping with Promise.all
        if (strategyArray) {
            const updatedStrategies = await Promise.all(
                strategyArray.map(async (e, index) => {
                    let indexName = null;
                    let strategyName = null;
                    
                    // Find strategy in simple or advance strategy collections
                    let findStrategy = await simpleStrategy.findOne({ _id: new ObjectId(e) });
                    if (!findStrategy) {
                        findStrategy = await advanceStrategy.findOne({ _id: new ObjectId(e) });
                    }

                    if (findStrategy) {
                        indexName = findStrategy.index;
                        strategyName = findStrategy.strategyName;
                    }

                    // Return the transformed strategy object
                    return {
                        strategyId: e,
                        weekends: { Mon: true, Tue: true, WED: true, THU: true, FRI: true },
                        multiplier: 1,
                        Index: indexName,
                        strategyName: strategyName
                    };
                })
            );
            updatedBucket.strategyArray = updatedStrategies;
        }

        if (endDate) updatedBucket.endDate = endDate;
        if (startDate) updatedBucket.startDate = startDate;

        // Perform the update operation
        const updateResult = await Bucket.updateOne(
            { bucketName: bucketName }, // Filter
            { $set: updatedBucket } // Updated fields
        );

        if (updateResult.modifiedCount === 0) {
            return sendResponse(res, 400, "No data updated. Provide correct details.", null, false);
        }

        return sendResponse(res, 200, "Success", updateResult, true);
    } catch (error) {
        return sendResponse(res, 500, error.message, null, false);
    }
});

//3:- DELETE BUCKET ROUTE :-
router.delete('/deleteBucket',async(req,res) => {
    try{
    const db = req.app.locals.db; 
    const Bucket = db.collection('bucket');
    let {bucketName}=req.body;
    if(!bucketName){
       return sendResponse(res,400,"please provide bucketName",null,false)
    }
    // jwt token
    let user="6510c7a0f64a3b0021d45c11";

    let deletebucket=await Bucket.deleteOne({bucketName:bucketName,user:user})
    console.log(deletebucket)
    if(deletebucket.deletedCount===0){
        return sendResponse(res,400,"Strategy not found",null,false);
    }

    return sendResponse(res,200,"bucket succesfully deleted",deletebucket,true)
    }catch(error){
        return sendResponse(res, 500, error.message, null, false);
    }
})

// 4:- GET ALL BUCKETS ROUTE :-
router.post('/getBucket',async(req,res) => {
    try {
        const db = req.app.locals.db; 
    const Bucket = db.collection('bucket');
    let user="6510c7a0f64a3b0021d45c11";
    let findBucket=await Bucket.find({user:user}).toArray()
    if(findBucket.length<=0){
        return sendResponse(res,200,"no bucket found",null,false)
    }
    return sendResponse(res,200,"bucket fetch succesfully",findBucket,true)

    } catch (error) {
        return sendResponse(res, 500, error.message, null, false);
    }
    
})
module.exports = router;  // Ensure you are exporting the router
