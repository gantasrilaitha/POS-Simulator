/*import React from 'react';
import { useState, useEffect } from 'react';
const Success=()=>{
    return(<div>
        <h2>login sucess</h2>
    </div>)
};
export default Success;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios'
const Success = () => {
  const [images, setImages] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [purchasedProducts, setPurchasedProducts] = useState([]);

  useEffect(() => {
    // Fetch images from the backend when the component mounts
    axios.get('https://pos-simulator-se-project-backend.vercel.app/images')
    .then((response) => setImages(response.data))
    .catch((error) => console.error('Error fetching images:', error));
    }, []);
    const productsPerRow = 3;
    
    const filterProducts = () => {
      const filteredProducts = images.filter((img) =>
        img.pbar.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSearchResults(filteredProducts);
    };
  
  
    // Handle search button click
    const handleSearchButtonClick = () => {
      filterProducts();
      const selectedPaymentMethod = document.getElementById('paymentMethodSelect').value;
      setPaymentMethod(selectedPaymentMethod);
    };
  
  const handleSearchInputChange = (e) => {
      setSearchInput(e.target.value);
  };  

  const handleQuantityInputChange = (productId, e) => {
    const inputValue = event.target.value;
    const newQuantities = { ...productQuantities };
    newQuantities[productId] = parseInt(inputValue, 10) || 0;
    setProductQuantities(newQuantities);
  };
  const calculateTotalPrice = (product) => {
    const quantity = productQuantities[product._id] || 0;
    return product.price * quantity;
  };
  const handleAddButtonClick = (productId) => {
    const quantity = productQuantities[productId] || 0;

    // Update quantity in MongoDB (you'll need to implement this)
    // Example API call to update quantity:
    axios
    .post(`https://pos-simulator-se-project-backend.vercel.app/updateQuantity/${productId}`, { quantity })
    .then((response) => {
      // After successfully updating the quantity, fetch the updated product data
      axios
        .get(`https://pos-simulator-se-project-backend.vercel.app/images/${productId}`)
        .then((response) => {
          // Update the product data in the state with the updated quantity
          const updatedProduct = response.data;
          setImages((prevImages) =>
            prevImages.map((img) =>
              img._id === updatedProduct._id ? updatedProduct : img
            )
          );
        })
        .catch((error) => console.error('Error fetching updated product data:', error));
    })
    .catch((error) => {
      console.error('Error updating quantity:', error);
      // Handle error
    });
     updateTotalCost();
     /*const purchasedProduct = updatedImages.find((img) => img._id === productId);
        if (purchasedProduct) {
          setPurchasedProducts((prevPurchasedProducts) => [...prevPurchasedProducts, purchasedProduct]);
      };*/
    
  };
  const updateTotalCost = () => {
    let newTotalCost = 0;

    // Calculate the total cost based on quantity and price of each product
    images.forEach((img) => {
      const quantity = productQuantities[img._id] || 0;
      newTotalCost += img.price * quantity;
    });

    setTotalCost(newTotalCost);
  };
  const handlePrintBill = () => {
    const billContent = generateBillContent();

    // Open a new window for printing
    const printWindow = window.open('', '', 'width=600,height=600');
    
    // Write the bill content to the new window
    printWindow.document.write(billContent);

    // Print the bill
    printWindow.print();

    // Close the new window after printing
    printWindow.close();
  };

  // Create a new array for purchased products
  const purchasedItems = images.filter((img) => productQuantities[img._id] > 0);
  const generateBillContent = () => {
    const products=images;
    const billHTML = `
      <html>
      <head>
        <title>Bill</title>
        <style>
          /* Add your bill styling here */
          /* For example: */
          body {
            font-family: Arial, sans-serif;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h1>Bill</h1>
        <p>Date & Time: ${new Date().toLocaleString()}</p>
        <p>Payment Method: ${paymentMethod}</p>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            ${purchasedItems.map((product) => 
              `
              <tr>
                <td>${product.pname}</td>
                <td>${productQuantities[product._id] || 0}</td>
                <td>${(calculateTotalPrice(product)).toFixed(2)}</td>
              </tr>
            `
            ).join('')}
          </tbody>
        </table>
        <p>Total Cost: ${totalCost.toFixed(2)}</p>
      </body>
      </html>
    `;

    return billHTML;
  };

  const handleClearButtonClick = () => {
    // Create an object with terminal number, payment method, and total cost
    const billingData = {
      terminalNo: document.getElementById('terminalSelect').value,
      paymentMethod: document.getElementById('paymentMethodSelect').value,
      totalCost,
    };
    axios
      .post('https://pos-simulator-se-project-backend.vercel.app/saveBillingData', billingData)
      .then((response) => {
        console.log('Billing data saved successfully:', response.data);
        // Clear the selected terminal number and payment method
        document.getElementById('terminalSelect').value = 'terminal1'; // Set default value
        document.getElementById('paymentMethodSelect').value = 'cash'; // Set default value
        // Reset the total cost
        setTotalCost(0);
        setSearchInput('');
      })
      .catch((error) => {
        console.error('Error saving billing data:', error);
        // Handle error
      });
  };


  return (
    <div className="product-container">
      <div className="total-cost">
      <p>Total Cost:</p>
      <input
        type="text"
        value={`${totalCost.toFixed(2)}`} // Format the total cost as a currency string
        readOnly // Prevent user input
      />
    </div>
      <header>
        <div className="search-container">
          <input type="text" id="productSearch" placeholder="Search by PBAR" value={searchInput}
            onChange={handleSearchInputChange}/>
          <button id="searchButton" onClick={handleSearchButtonClick}>
            Search
          </button>
          <select id="terminalSelect">
            <option value="terminal1">Terminal 1</option>
            <option value="terminal2">Terminal 2</option>
            {/* Add more terminal options as needed */}
          </select>
          <select id="paymentMethodSelect">
            <option value="cash">Cash</option>
            <option value="credit">Credit Card</option>
            {/* Add more payment method options as needed */}
          </select>
          <button onClick={handlePrintBill} >Print Bill</button> <button id="clearButton" onClick={handleClearButtonClick}>Clear</button>
        </div>
      </header>
      
      <div className="product-grid">
        
      {searchInput === '' ? (
          // Display all products when search input is empty
        
        images.map((img,index) => (
            <div
            key={img._id}
            className={`product-card ${index % productsPerRow === 0 ? 'new-row' : ''}`}
             >
            <img src={img.pid}  />
            <p className="mname">Product name: {img.pname}</p>
            <p className="price">Price: {img.price}</p>
            <p className="qty">Quantity: {img.qty}</p>
            <input
                type="number"
                placeholder="Quantity"
                value={productQuantities[img._id] || ''}
                onChange={(e) =>
                  handleQuantityInputChange(img._id, e)
                }
            />
            <button onClick={() => handleAddButtonClick(img._id)}>Add</button>
            <p className="qty">Total Price: ${calculateTotalPrice(img)}</p>
            </div>
        ))
      ):(searchResults.map((img) => (
        <div key={img._id} className="product-card">
          <img src={img.pid} alt={img.pname} />
          <p className="mname">Product name: {img.pname}</p>
          <p className="price">Price: {img.price}</p>
          <p className="qty">Quantity: {img.qty}</p>
          <input
                type="number"
                placeholder="Quantity"
                value={productQuantities[img._id] || ''}
                onChange={(e) =>
                  handleQuantityInputChange(img._id, e)
                }
              />
          <button onClick={() => handleAddButtonClick(img._id)}>Add</button>
          <p className="qty">Total Price: ${calculateTotalPrice(img)}</p>
        </div>
      ))
      )}
      </div>
    </div>
  );
};

export default Success;
