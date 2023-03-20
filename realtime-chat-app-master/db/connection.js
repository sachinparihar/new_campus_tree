const mongoose=require('mongoose');
mongoose.set('strictQuery', false);
require("dotenv").config();
const url=process.env.url;

mongoose.connect(url).then(()=>{
console.log("db is get connected");
}).catch((err)=>{
console.log(err);
});