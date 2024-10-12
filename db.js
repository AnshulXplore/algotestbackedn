const { MongoClient } = require('mongodb');
const URL = "mongodb+srv://anshul:Q395dd4hgra_L4V@anshul1.vfwim.mongodb.net/algotest";
const dbName = "algoTest";

let dbConnection;

const connectToMongo = async () => {
    if (dbConnection) {
        return dbConnection; // अगर कनेक्शन पहले से है, तो वही रिटर्न करें
    }

    const client = new MongoClient(URL);

    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");

        dbConnection = client.db(dbName); // डेटाबेस कनेक्शन सेट करें
        return dbConnection;

    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        throw error;
    }
};

module.exports = connectToMongo;
