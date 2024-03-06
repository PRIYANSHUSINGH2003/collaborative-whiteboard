// db.js
const mongoose = require('mongoose');
const DB = process.env.DB_CONNECTION_STRING;

mongoose.connect(DB).then(()=>console.log("data base connected")).catch((error)=>console.log("error " + error.message))
