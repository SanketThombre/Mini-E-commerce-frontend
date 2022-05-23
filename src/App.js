import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Products } from "./Components/Products";
import { Login } from './Components/Login';
import {useSelector} from 'react-redux';
import { PrivateRoute } from './Components/PrivateRoute';
import { SignUp } from './Components/SignUp';
import { Navbar } from './Components/Navbar';
import { Categories } from "./Components/Categories";
import { Men } from "./Components/Men"
import { Women } from "./Components/Women"
import { Accessories } from "./Components/Accessories";
import { ProductsDetailPage } from './Components/ProductsDetailPage';
import { Addcart } from './Components/Addcart';
import {Checkout} from './Components/Checkout'


function App() {

  const { isauthenticated } = useSelector((state) => state.login);
  const { products } = useSelector((state) => state.products);


  
  return (
    <div className="App">
      <Navbar />
      {isauthenticated ?  <Categories/> : ""}
     
      <Routes>
        <Route path="/" element={
          <PrivateRoute isauthenticated={isauthenticated}>
             <Products />
          </PrivateRoute>
         } />
        <Route path="/login" element={
          
          <Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/men" element={<PrivateRoute isauthenticated={isauthenticated}>
          <Men prod={products.filter((item) => item.type == "Men")} />
          </PrivateRoute>
          } />
        <Route path="/women" element={<PrivateRoute isauthenticated={isauthenticated}>
          <Women prod={products.filter((item) => item.type == "Women")} />
          </PrivateRoute>
          } />
        <Route path="/accessories" element={
          <PrivateRoute isauthenticated={isauthenticated}>
            <Accessories prod={products.filter((item) => item.type == "Accessories")} />
            </PrivateRoute>
          } />
        
        <Route path="/productdetail/:id" element={
          <PrivateRoute isauthenticated={isauthenticated}>
            <ProductsDetailPage />
            </PrivateRoute>
          } />

      <Route path='/addcart' element={
         <PrivateRoute isauthenticated={isauthenticated}>
          <Addcart />
          </PrivateRoute>} />
        
          <Route path='/checkout' element={
         <PrivateRoute isauthenticated={isauthenticated}>
          <Checkout />
          </PrivateRoute>} />
        
     </Routes>
    </div>
  );
}

export default App;
