const express =require('express');
const router =express.Router();
const Person =require('../models/Person')

// post method
router.post('/',async(req,res)=>{
    try {
        const data = req.body; // assuming that req.body is containig person data
        
        //create new person object using  the mongoose model 

        const newPerson = new Person(data);

        //save the person data to  database
        const response = await newPerson.save();
        console.log("data saved");
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error.."})
        
    }
})
//  get method
router.get('/',async(req,res)=>{
    try {
        
        const data =await Person.find();
        console.log("data get...");
        res.status(200).json({data});

    } catch (error) {
        console.log(error);

        res.status(500).json({message:"internal server error..."})
    }
});

// parameterized api

router.get('/:worktype',async(req,res)=>{
    try {
        const worktype =req.params.worktype //extract work type from the url
        if(worktype ==="chef" || worktype =="manager" || worktype=="waiter"){
            const response =await Person.find({work:worktype});
            console.log("response fetch...");
            res.status(200).json(response);
        }else{
            res.status(404).json({error: "invalid work type"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message :"internal server error..."})
    }
})


// update api

router.put('/:id',async(req,res)=>{
    try {
        const personId= req.params.id;
        const updatedata = req.body;
        const response =await Person.findByIdAndUpdate(personId,updatedata,{
            new:true, //return updated  document
            runValidators:true //run  Monoose Validation
        });
        if(!response){
            return res.status(200).json({message:"id not found"})
        }
        console.log("data updated");
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error.."});
    }
});

router.delete('/:id',async(req,res)=>{
    try {
        const personId =req.params.id;

        const response =await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({message:"internal server error."});
        }
        console.log("data deleted..");
        res.status(200).json({messae:"data deleted"})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
})



module.exports =router;