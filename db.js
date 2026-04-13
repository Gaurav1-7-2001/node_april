const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost:27017/april_node_hotel')


const db =mongoose.connection;

db.on('connected',()=>{
    console.log('connected to mongodb...');
})

db.on('disconnected',()=>{
    console.log('disconnected to mongodb...');
})

db.on('error',()=>{
    console.log('error to mongodb...');
});

module.exports =db;