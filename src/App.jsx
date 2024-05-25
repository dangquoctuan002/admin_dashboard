import { useState } from "react";
import ProductItem from "./components/productItem/index.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import 'typeface-roboto';

//category
import ListCategory from "./pages/categories/index.jsx"

import ListBrand from "./pages/brands/index.jsx"

import ListProduct from "./pages/products/index.jsx"


function App() {


  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Dashboard />} />

              <Route path="/categories">
                <Route index element={<ListCategory />} />
              </Route>

              <Route path="/brands">
                <Route index element={<ListBrand />} />
              </Route>

              <Route path="/products">
                <Route index element={<ListProduct />} />
              </Route>

            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
