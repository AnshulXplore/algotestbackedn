// controller/bucket/bucketController.js
const express = require("express");
const router = express.Router();
const sendResponse = require('../helper/helper');
const {  ObjectId } = require('mongodb');
const fetchUser=require('../../middleware/fetchUser')
const creditChecker=require('../../middleware/creditChecker')

//1:- CREATE THE BUCKET ROUTE :-
router.post("/createBucket",fetchUser,creditChecker,async (req, res) => {
    try {
        let userId=req.userData.userId;
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
            user:userId,
            backtest:false
        };
        let createBucket=await Bucket.insertOne(newbucket)
        return sendResponse(res,200,"bucket cretaed succesfully",createBucket,true)
    } catch (error) {
        return sendResponse(res, 500, error.message, null, false);
    }
});

// 2:- UPDATE THE BUCKET ROUTES:-
router.put('/updateBucket',fetchUser,creditChecker,async (req, res) => {
    try {
        let userId=req.userData.userId;
        const db = req.app.locals.db;
        const Bucket = db.collection('bucket');
        const simpleStrategy = db.collection('simpleStrategy');
        const advanceStrategy = db.collection('advancestrategy');
        const  updatedBucket  = req.body;
        if(!updatedBucket.bucketName){
            return sendResponse(res,400,"bucketName is required",null,false)
        }
        if(updatedBucket.strategyArray.length<=0){
            return sendResponse(res, 400, "Please select at least one strategy to create the bucket", null, false);
        }
        // Asynchronous mapping with Promise.all
        // Perform the update operation
        const updateResult = await Bucket.updateOne(
            { bucketName: updatedBucket.bucketName,user:userId}, // Filter
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
router.delete('/deleteBucket',fetchUser,creditChecker,async(req,res) => {
    try{
        let userId=req.userData.userId;
        const db = req.app.locals.db; 
        const Bucket = db.collection('bucket');
        let {bucketName}=req.body;
        if(!bucketName){
            return sendResponse(res,400,"please provide bucketName",null,false)
        }
        let deletebucket=await Bucket.deleteOne({bucketName:bucketName,user:userId})
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
router.post('/getBucket',fetchUser,async(req,res) => {
    try {
        let userId=req.userData.userId;
        const db = req.app.locals.db; 
        const Bucket = db.collection('bucket');
        let user="6510c7a0f64a3b0021d45c11";
        let findBucket=await Bucket.find({user:userId}).toArray()
        if(findBucket.length<=0){
            return sendResponse(res,200,"no bucket found",null,false)
        }
        return sendResponse(res,200,"bucket fetch succesfully",findBucket,true)
    } catch (error) {
        return sendResponse(res, 500, error.message, null, false);
    }
})
module.exports = router;  // Ensure you are exporting the router
