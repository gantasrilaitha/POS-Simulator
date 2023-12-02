const mongoose=require('mongoose');
const ItemSchema= new mongoose.Schema({
    pid: String,
    pname: String,
    price: String,
    qty: String,
    originalqty:String,
},{ collection: 'items' });
const ItemModel=mongoose.model("AvalItema",ItemSchema)
module.exports=ItemModel;