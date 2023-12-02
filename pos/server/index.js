const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const StaffModel=require('./models/Staff');
const ItemModel = require('./models/Img');
const BillingModel = require('./models/Billing');
const AdminModel=require('./models/Admin');
const cors = require('cors');
const app=express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/pos",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

app.post('/saveBillingData', async (req, res) => {
    try {
      const { terminalNo, paymentMethod, totalCost } = req.body;
      const collectionExists = await mongoose.connection.db.listCollections({
        //name: 'BillingCollection',
        name: 'billings',
      }).hasNext();
      if (!collectionExists) {
        await mongoose.connection.db.createCollection('Billing');
      }
      const billingData = new BillingModel({
        terminalNo,
        paymentMethod,
        totalCost,
        timestamp: new Date(),
      });
      await billingData.save();
      res.status(201).json({ message: 'Billing data saved successfully' });
    } catch (error) {
      console.error('Error saving billing data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});
  

app.get('/images/:productId', async (req, res) => {
    try {
      const { productId } = req.params;
  
      // Fetch the product by ID from the database (assuming you have a Product model)
      const product = await ItemModel.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Send the product data as a JSON response
      res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/updateQuantity/:productId', async (req, res) => {
    try {
      const { productId } = req.params;
      const  purchasedQuantity  = req.body;
      console.log(purchasedQuantity.quantity);
      const product = await ItemModel.findById(productId);
      const parsedQuantity = parseInt(purchasedQuantity.quantity, 10);
      console.log(parsedQuantity);
      if (isNaN(parsedQuantity)) {
        return res.status(400).json({ message: 'Invalid purchasedQuantity' });
      }

      const newQuantity = product.qty - parsedQuantity;
      // Update the quantity for the product with the given ID
      await ItemModel.findByIdAndUpdate(productId, { qty: newQuantity });
      res.status(200).json({ message: 'Quantity updated successfully' });
    } catch (error) {
      console.error('Error updating quantity:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.get('/images', async (req, res) => {console.log(req.body)
    try {
      // Retrieve all image records from the MongoDB collection
      const images = await ItemModel.find();
      console.log(images)
      res.json(images);
    } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).json({ error: 'Could not fetch images' });
    }
  });

app.post('/detail',(req,res)=>{
    const {username,password}= req.body;
    //console.log(String(req.body.username));
    //password.toString()
    StaffModel.findOne({username: username})
    .then(user => {console.log(user)
        if(user){
            if (user.password===password){
                res.json("Success")
            }else{
                res.json("INVALID LOGIN")
            }
        }else{console.log("errrr");
            res.json("invalid");
        }
    })
    .catch((err) => {
        console.error("Error occurred:", err); // Log any errors that occur during the query
        res.status(500).json("Internal Server Error"); // Return an error response to the client
    })
})

app.post('/admindetail',(req,res)=>{
  const {username,password}= req.body;
  //console.log(String(req.body.username));
  //password.toString()
  AdminModel.findOne({username: username})
  .then(user => {console.log(user)
      if(user){
          if (user.password===password){
              res.json("Success")
          }else{
              res.json("INVALID LOGIN")
          }
      }else{console.log("errrr");
          res.json("invalid");
      }
  })
  .catch((err) => {
      console.error("Error occurred:", err); // Log any errors that occur during the query
      res.status(500).json("Internal Server Error"); // Return an error response to the client
  })
})

app.get('/billing', async (req, res) => {
  try {
    const billingData = await BillingModel.find();

    const terminalCostMap = {};
    billingData.forEach((record) => {
      const { terminalNo, totalCost } = record;
      if (!terminalCostMap[terminalNo]) {
        terminalCostMap[terminalNo] = 0;
      }
      terminalCostMap[terminalNo] += totalCost;
    });

    const result = Object.entries(terminalCostMap).map(([terminalNo, totalCost]) => ({
      terminalNo,
      totalCost,
    }));
    //console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/products', async (req, res) => {
  try {
    const itemsData = await ItemModel.find();
    const products = itemsData.map(item => ({
      pname: item.pname,
      sale: parseInt(item.originalqty,10)-parseInt(item.qty,10)
    }));
    //console.log(products);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/low-quantity-items', async (req, res) => {
  try {
    const threshold = '10'; // Set your specific threshold here
    const lowQuantityItems = await ItemModel.find({
      $expr: { $lt: [ { $toInt: "$qty" }, { $toInt: threshold } ] }
    });
    console.log(lowQuantityItems);
    res.json(lowQuantityItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3001,()=>{
    console.log('server is running')
})