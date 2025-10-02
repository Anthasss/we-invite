import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./navigation/Layout";
import Home from "./pages/Home";
import Footer from "./navigation/Footer";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;

