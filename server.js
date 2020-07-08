const express = require("express")
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
const mongoose= require("mongoose") ;

const app =express()
const port =3000

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set('views', './views')
app.set('view engine', 'pug')

//Connection URL
const url = 'mongodb://localhost/rsvp';


//use connect method to connect to the server
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true},function(){
  console.log('Connected successfully to server');
})

const GuestSchema = mongoose.Schema(
  {
    name:String,
    email:String,
    attending:Boolean,
    guests:Number,
  });

const Response = mongoose.model("Guests", GuestSchema);

app.post("/reply", async (req,res) =>{
    // console.log(req.body)
    const response = new Response({
      name:req.body.name,
      email:req.body.email,
      attending:req.body.attending,
      guests:req.body.guests
    });
    // console.log(response)
    try{
      await response.save()
      res.render('reply',{title:"Thank you for your response!"})
    }catch(err){
      res.send("Error")
    }
  })
  
app.get("/", (req,res) =>{
    res.render('index',{title:"RSVP"})
})

app.get("/guests", (req,res) =>{
  Response.find({attending:true},function(err,attending){
    Response.find({attending:false},function(err,notAttending){
      res.render('guests',{title:"Guest List",attending,notAttending})
    })
    // console.log({people:response})
  })
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);