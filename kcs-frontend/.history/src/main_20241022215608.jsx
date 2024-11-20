
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { CartProvider } from "./pages/Store/Cart";
createRoot(document.getElementById("root")).render(

    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>



);
