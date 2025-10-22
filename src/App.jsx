import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { OrderProvider } from "./contexts/orderContext";
import { AuthContextProvider } from "./contexts/authContext";

import Layout from "./navigation/Layout";
import Footer from "./navigation/Footer";

// public pages
import Home from "./pages/Home";
import Order from "./pages/Order";
import MyOrder from "./pages/MyOrder";

// admin pages
import AdminProductsPage from "./pages/Admin/productsPage";
import AdminOrderPage from "./pages/Admin/ordersPage";

function App() {
  return (
    <AuthContextProvider>
      <OrderProvider>
        <Router>
          <Layout>
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/order/:productId"
                element={<Order />}
              />
              <Route
                path="/my-order"
                element={<MyOrder />}
              />
              <Route
                path="/admin/products"
                element={<AdminProductsPage />}
              />
              <Route
                path="/admin/orders"
                element={<AdminOrderPage />}
              />
            </Routes>
            <Footer />
          </Layout>
        </Router>
      </OrderProvider>
    </AuthContextProvider>
  );
}

export default App;

