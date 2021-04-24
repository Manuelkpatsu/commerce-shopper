import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { loadStripe } from "@stripe/stripe-js";
import { CartProvider } from "use-shopping-cart";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Result from "./pages/Result";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const stripePromise = loadStripe('pk_test_51IjlsUCp0V5vmwjxxElg9ZivBv2D0ovvJHB15gVyu6OGlO8UM6Pon2cW6Qm0Q3C93psGGSBtAY9Mz7E9bAn3h04d007pvQIr1v')

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider 
        mode="checkout-session"
        stripe={stripePromise}
        currency="USD"
      >
        <BrowserRouter>
          <Navbar />
          <Toaster position="bottom-center" />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/result" component={Result} />
            <Route path="/:productId" component={Product} />
          </Switch>
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  )
}

export default App;
