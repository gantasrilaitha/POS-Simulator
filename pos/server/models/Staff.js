const mongoose=require('mongoose');
const StaffSchema= new mongoose.Schema({
    password: String,
    username: String
},{ collection: 'staff' });
const StaffModel=mongoose.model("User",StaffSchema)
module.exports=StaffModel;