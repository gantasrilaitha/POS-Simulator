import { useState } from 'react'
import './App.css'
import {BrowserRouter , Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import Choose from './Choose'
import Success from './Success'
import AdminSignup from './AdminSignup'
import AdminApp from './AdminSuccess'
function App() {

  return (
    /*<div>
      <Signup />
    </div>*/
    <BrowserRouter>
    
    <Routes>
    <Route path ='/' element={<Choose />}></Route>
      <Route path ='/signup' element={<Signup />}></Route>
      <Route path ='/success' element={<Success />}></Route>
      <Route path ='/adminsignup' element={<AdminSignup />}></Route>
      <Route path ='/adminsuccess' element={<AdminApp />}></Route>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
