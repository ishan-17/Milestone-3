import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "./pages/Auth/Login";
import Navbar from "./components/Headers/Navbar";
//import Signup from "./pages/Auth/Signup";
import CreateProductForm from "./components/Product/CreateProductForm";
import ProductList from "./components/Product/ProductList";
import IndividualProduct from "./components/Product/IndividualProduct";
import CategoryState from "./context/CategoryState";
import EditProductForm from "./components/Product/EditProductForm";
import Login from "./Login";
import Signup from "./Signup";
import AuthState from "./context/AuthState";
import Footer from "./components/Footer/Footer";
import React, {useEffect, useState} from "react";


function App() {

  const [backendData, setBackendData] = useState([{}])

    useEffect(() => {
      fetch("/api").then(
        Response => Response.json()
      ).then(
        data => {
        setBackendData(data)
        }
      )
    },  [])

  return (
    <>
    <AuthState>
      <CategoryState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create-product" element={<CreateProductForm />} />
            <Route path="/product-listing" element={<ProductList />} />
            <Route path="/product/:id" element={<IndividualProduct />} />
            <Route path="/edit-your-product/:id" element={<EditProductForm/>} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CategoryState>
      </AuthState>
    </>
  );
}

export default App;
