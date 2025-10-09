import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { OrderProvider } from "./contexts/orderContext";

import Layout from "./navigation/Layout";
import Footer from "./navigation/Footer";
import Home from "./pages/Home";
import Order from "./pages/Order";

function App() {
  return (
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
          </Routes>
          <Footer />
        </Layout>
      </Router>
    </OrderProvider>
  );
}

export default App;

