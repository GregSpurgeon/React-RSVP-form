const express = require("express")
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
// import Response from './attendees'

const app =express()
const port =3000

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set('views', './views')
app.set('view engine', 'pug')

app.get("/", (req,res) =>{
    res.render('index',{title:"RSVP"})
})

app.post("/reply", (req,res) =>{
  res.render('reply',{title:"Thank you for your response!"})
})

app.get("/guests", (req,res) =>{
  res.render('guests',{title:"Guest List"})
})


//Connection URL
const url = 'mongodb://localhost:27017';

//Database Name
const dbName= 'rsvp';

//use connect method to connect to the server
MongoClient.connect(url, function(err,client){
  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db= client.db(dbName);
    client.close();
})


app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);