const express = require("express");
const path = require("path");
const app = express();

const mongoose = require('mongoose');
const bodyparser = require('body-parser');

main().catch(err => console.log(err));

async function main() {
   await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}

const port = 8000;

//Define mongoose schema
const contactSchema = new mongoose.Schema({
   name: String,
   phone: String,
   email: String,
   address: String,
   desc: String
 });
 
//  kittySchema.methods.speak = function speak() {
//      const greeting = 'My name is ' + this.name
//      console.log(greeting);
//    };
 
 const Contact = mongoose.model('Contact', contactSchema);




 //EXPRESS SPECIFIC STUFF
 app.use('/static', express.static('static'))      //for serving static files
 app.use(express.urlencoded())

 //PUG SPECIFIC STUFF
 app.set('view engine','pug')                      //set the template engine as pug
 app.set('views',  path.join(__dirname,'views'))   //set the views directory
 
 
 //ENDPOINTS
 app.get('/', (req,res)=>{
   const params = {}
   res.status(200).render('home.pug',params)
});

 app.get('/contact', (req,res)=>{
   const params = {}
   res.status(200).render('contact.pug',params)
});


 app.post('/contact', (req,res)=>{
   var myData = new Contact(req.body);
   myData.save().then(()=>{
      res.send("This item has been saved into database.")
   }).catch(()=>{
      res.status(400).send("Item was not saved into database.")
   });
   // res.status(200).render('contact.pug')
});



 //START THE SERVER
 app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
 });