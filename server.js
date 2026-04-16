const express =require('express');
const app =express();


// middle ware
const bodyParser =require('body-parser');
app.use(bodyParser.json()); //req.body

const db =require('./db')
const Person =require('./models/Person');

const passport =require('./auth');


app.use(passport.initialize());
const localAuth = passport.authenticate('local',{session:false});
// middle ware function 

const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made To: ${req.originalUrl}`)
    next();
}

app.use(logRequest);
app.get('/',localAuth,(req,res)=>{
    res.send('welcome to my hotel....')
})


// import person routes

const personRoutes = require('./routes/personRoutes');
// use the router
app.use('/person',personRoutes);

const PORT =process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log('listening on port 3000')
})


