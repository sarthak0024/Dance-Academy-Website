// getting-started.js
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/sarthakKart");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection server: "));
db.once("open", function () {
  console.log("we are connected successfully...");
});

const kittySchema = new mongoose.Schema({
  name: String,
});

kittySchema.methods.speak = function speak() {
    const greeting = 'My name is ' + this.name
    console.log(greeting);
  };

const Kitten = mongoose.model('Kitten', kittySchema);

const sarthakKitty = new Kitten({ name: 'sarthakKitty' });
const sarthakKitty2 = new Kitten({ name: 'sarthakKitty2'});
// console.log(sarthakKitty.name); // 'Silence'

// sarthakKitty.speak();

sarthakKitty.save();
// sarthakKitty.speak();

sarthakKitty2.save();
// sarthakKitty.speak();

const kittens =  Kitten.find({name:"sarthakKitty"});
console.log(kittens);



//127.0.0.1:27017
