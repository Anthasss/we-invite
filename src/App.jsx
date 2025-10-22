import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { OrderProvider } from "./contexts/orderContext";
import { AuthContextProvider } from "./contexts/authContext";

import Layout from "./navigation/Layout";
import Footer from "./navigation/Footer";
import Home from "./pages/Home";
import Order from "./pages/Order";
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
              {/* should use api to fetch product from id */}
              <Route
                path="/order/:productId"
                element={<Order />}
              />
              <Route
                path="/admin/product"
                element={<AdminProductsPage />}
              />
              <Route
                path="/admin/order"
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

