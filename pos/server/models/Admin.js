const mongoose=require('mongoose');
const AdminSchema= new mongoose.Schema({
    password: String,
    username: String
},{ collection: 'Admin' });
const AdminModel=mongoose.model("UserAdmin",AdminSchema)
module.exports=AdminModel;