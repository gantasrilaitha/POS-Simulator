const mongoose = require('mongoose');

// Create a Mongoose schema for the billing data
const billingSchema = new mongoose.Schema({
  terminalNo: String,
  paymentMethod: String,
  totalCost: Number,
  timestamp: Date,
});

// Create a Mongoose model based on the schema
const BillingModel = mongoose.model('Billing', billingSchema);
module.exports=BillingModel;