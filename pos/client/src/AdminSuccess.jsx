
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';



import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
  } from 'chart.js';
  
import { Bar ,Pie} from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    BarElement
)

const AdminApp = () => {
  const [billingData, setBillingData] = useState([]);
  const [productSales, setProductSales] = useState([]);
  const [lowQuantityItems, setLowQuantityItems] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {   
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pos-simulator-se-project-backend.vercel.app/billing');
        setBillingData(response.data);
        const productsResponse = await axios.get('https://pos-simulator-se-project-backend.vercel.app/products');
        setProductSales(productsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  //console.log(billingData);
  
  const fetchLowQuantityItems = async () => {
    try {
      const response = await axios.get('https://pos-simulator-se-project-backend.vercel.app/low-quantity-items');
      setLowQuantityItems(response.data);
    } catch (error) {
      console.error(error);
      setError('Error fetching low quantity items');
    }
  };

  const terminalLabels = billingData.map(item => item.terminalNo);
  const costData = billingData.map(item => item.totalCost);
  const productLabels = productSales.map(item => item.pname);
  const productSalesData = productSales.map(item => item.sale);

  const option = {
    responsive: true,
    plugins: {
      legend: { position: "chartArea" },
      title: {
        display: true,
        text: "Modular Bar Chart",
      },
    },
  };

  const productSalesOptions = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
      title: {
        display: true,
        text: "Product Sales",
      },
    },
  };

  const data = {
    labels: terminalLabels,
    datasets: [
      {
        label: 'Total Cost per Terminal',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: costData,
      },
    ],
  };
  const productSalesChartData = {
    labels: productLabels,
    datasets: [
      {
        label: 'Product Sales',
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: productSalesData,
      },
    ],
  };

  return (
    <div>
       <button onClick={fetchLowQuantityItems}>Fetch Low Quantity Items</button>
       {lowQuantityItems.length >= 0 && (
        <div>
          <h2>Low Quantity Items</h2>
          <ul>
            {lowQuantityItems.map(item => (
              <li key={item._id}>
                {item.pname} - Current Quantity: {item.qty}
              </li>
            ))}
          </ul>
        </div>)}
      <h2>Billing Chart</h2>
      <Bar  data={data} ></Bar>
      <h2>Product Sales</h2>
      <Pie data={productSalesChartData} options={productSalesOptions} ></Pie>
    </div>
  );
};



export default AdminApp;