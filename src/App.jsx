import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Home from './pages/home/home';
import Product from './pages/product/product';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Cart from './pages/cart/cart';
import Address from './pages/address/address';

import Search from './pages/search/search';
import AllOrders from './pages/settings/allOrders';
import SpecificOrder from './pages/settings/specificOrder';
import OrderPlacement from './pages/order-placement/order';
import OrderConfirmation from './pages/order-confirmation/orderConfirmation';
import Products from './pages/admin/products/products';
import CreateProducts from './pages/admin/products/createproducts';
import AfterRegistration from './pages/auth/afterRegistration';
import EditProducts from './pages/admin/products/editProducts';
import { Provider } from 'react-redux';
import store from './store/store'
import Orders from './pages/admin/orders/orders';
import ViewOrder from './pages/admin/orders/viewOrder'
import UserSettings from './pages/settings/accountSettings'
function App() {
  

  return (
    <>
    <Provider store = { store }>
    <CookiesProvider >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/product/:PID" element={<Product/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/address" element={<Address/>} />
          {/* <Route path="/payment" element={<Payment/>} /> */}
          <Route path="/allOrders" element={<AllOrders/>} />
          <Route path="/order/:OID" element={<SpecificOrder/>} />
          <Route path="/OrderPlacement" element={<OrderPlacement/>} />
          <Route path="/orderConfirmation" element={<OrderConfirmation/>} />

          <Route path="/userSettings" element={<UserSettings/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/afterRegistration" element={<AfterRegistration/>} />
          <Route path="/signup" element={<Register/>} />
          <Route path="/admin">
            <Route path='products' element={<Products />} />
            <Route path='createProduct' element={<CreateProducts />} />
            <Route path='editProduct/:PID' element={<EditProducts />} />
            <Route path='orders' element={<Orders />} />
            <Route path='viewOrder/:ID' element={<ViewOrder />} />
          </Route>
          <Route path="/*" element={<Home/>} /> 
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
    </Provider>
    </>
  )
}

export default App
