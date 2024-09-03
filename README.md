# POS-Simulator for Retail Stores-SE Project🛒

## **Overview**
POS Simulator is a comprehensive software solution designed to implement a point-of-sale (POS) system for physical retail stores. Offers a range of features to streamline and secure retail operations, including:

- **➡️Secure Authentication**: Staff and admin can securely log into the system.
- **➡️Product Management**: Search products by barcode, calculate quantities and total prices, and update stock in the backend database.
- **➡️Payment Options**: Customers can choose from various payment methods, and a bill is generated accordingly.
- **➡️Admin Features**: Admins are alerted if product stock goes below a threshold, can *visualise* daily sales, per-terminal transactions, and end-of-day stock levels.

## **Tech Stack-MERN Stack**
<p align="center">
  <img src="https://img.icons8.com/color/48/000000/mongodb.png" alt="MongoDB" width="40" height="40"/>
  <img src="https://img.icons8.com/color/48/000000/express-js.png" alt="Express.js" width="40" height="40"/>
  <img src="https://img.icons8.com/color/48/000000/react-native.png" alt="React" width="40" height="40"/>
  <img src="https://img.icons8.com/color/48/000000/nodejs.png" alt="Node.js" width="40" height="40"/>
  <img src="https://img.icons8.com/color/48/000000/vite.png" alt="Vite" width="40" height="40"/>
  <img src="https://img.icons8.com/color/48/000000/jira.png" alt="Jira" width="40" height="40"/>
  <img src="https://img.icons8.com/color/48/000000/vercel.png" alt="Vercel" width="40" height="40"/>
  <img src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/000000/external-mongodb-a-cross-platform-document-oriented-database-program-logo-color-tal-revivo.png" alt="MongoDB Atlas" width="40" height="40"/>
</p>

## **How to use**
- **Clone the repo:** ```git clone https://github.com/gantasrilaitha/POS-Simulator-SE-Project```

- **Database creation:**
    - For mongodb compass (local db): Create a database named "pos" in mongodb compass and insert some items into the collections whose schema is defined in ```cd server/models/```
    - For mongodb atlas (cloud db): <br>
        *Step 1:* Create a project in mongodb atlas. ex: point_of_sale_simulator-seproj<br>
        *Step 2:* Navigate to the project created and create a database under Deployment in left pannel. Create a shared cluster(free sandbox)<br>
        *Step 3:* Navigate to Network access under Security in left pannel and add the i.p address ``` 0.0.0.0/0 ``` so that it can be accessed by anyone & anywhere<br>
        *Step 4:* Goto Collections tab in your database & insert the required documents and collections whose schema is defined in ``` cd server/models/``` <br>
        
  
- **Configurations for deployment:** Create a ```.env``` file in ```/pos/server/config``` directory and store the URI(mongo atlas connection url format)="mongodb+srv://<username>:<user_password>@<XXX.XXXXX.mongodb.net>/<db_name>?retryWrites=true&w=majority&appName=<cluster_name>"  and PORT(you can use any port number as per your convenience).
  
- **Frontend (Client):**
    ```bash
    cd client
    npm run dev
    ```

- **Backend (Server):**
    ```bash
    cd server
    npm start
    ```
- **Open, to see the application running locally:** ```http://localhost:5173/```
  
- **Open, to see the application running on Vercel, after deployment:** [POS](https://pos-simulator-se-project-frontend.vercel.app/)
  
## **Have a look**
[New Tab.webm](https://github.com/user-attachments/assets/ddac290e-774f-4646-8ec8-10ab59076a8e)

## **Note**
All documentations wrt to project are available in the repo. Have a look!

## **Review Feedback**
Let me know your feedback on srilaitha2003@gmail.com
