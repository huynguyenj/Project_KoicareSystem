import { createRoot } from "react-dom/client";
import { StrictMode } from "react"; // Import StrictMode
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { CartProvider } from "./pages/Store/Cart";
import Footer from "./components/Footer/Footer1.jsx";

createRoot(document.getElementById("root")).render(


    <CartProvider>
      <App />
      <Footer/>
    </CartProvider>

);
