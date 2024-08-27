import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import About from "./pages/about/About";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Contact from "./pages/contact/Contact";
import Product from "./pages/product/Product";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/routes/Admin";
import UserRoute from "./components/routes/UserRoute";
import Cart from "./pages/cart/Cart";
import ProductCatList from "./pages/product/ProductCatList";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productCatList" element={<ProductCatList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/dashboard" element={<UserRoute />}>
          <Route path="user" element={<UserDashboard />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
