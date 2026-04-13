const express =require('express');
const app =express();

// middle ware
const bodyParser =require('body-parser');
app.use(bodyParser.json()); //req.body

const db =require('./db')
const Person =require('./models/Person');
app.get('/',(req,res)=>{
    res.send('welcome to my hotel....')
})


// import person routes

const personRoutes = require('./routes/personRoutes');
// use the router
app.use('/person',personRoutes);

app.listen(3000,()=>{
    console.log('listening on port 3000')
})


