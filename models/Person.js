const mongoose = require('mongoose');

// create schema of Person
const personSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    age:{
        type:Number,
    },
    work:{
        type:String,
        enum:['chef','manager','waiter'],
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    }
})

// create model
const Person = new mongoose.model('Person',personSchema);

module.exports =Person;