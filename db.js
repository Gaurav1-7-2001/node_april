const mongoose =require('mongoose');
require('dotenv').config();
const mongodbUrl=process.env.LOCAL_MONGODB_URL
// const mongodbUrl=process.env.MONGODB_URL
mongoose.connect(mongodbUrl)


const db =mongoose.connection;

db.on('connected',()=>{
    console.log('connected to mongodb...');
})

db.on('disconnected',()=>{
    console.log('disconnected to mongodb...');
})

db.on('error',(err)=>{
    console.log('error to mongodb...',err);
});

module.exports =db;