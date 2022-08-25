import './App.css';
import Store from './Store'
import Home from "./component/Home/Home";
import ProductDetails from "./component/Products/ProductDetails"
import { useEffect, useState } from 'react';
import WebFont from "webfontloader";
import {BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import LoginSignup from "./component/Authentication/LoginSignup";
import UserOptions from './layout/UserOptions';
import { useSelector } from 'react-redux';
import { loadUser } from './actions/userActions';
import ProtectedRoute from './route/ProtectedRoute';
import Profile from './component/User/Profile';
import UpdatePassword from './component/User/UpdatePassword';
import EditProfile from './component/User/EditProfile';
import About from './component/About/About';
import Products from './component/Products/Products'
import Search from './component/Products/Search';
import Support from './Others/Support';
import Cart from './component/Cart/Cart';
import Favourites from './component/Cart/Favourites';
import Shipping from './component/Cart/Shipping';
import confirmOrder from './component/Cart/confirmOrder';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './component/Cart/Payment';
import Success from './component/Cart/Success';
import MoreOption from './component/User/MoreOptions';
import MyOrder from './component/User/MyOrder'
import Dashboard from './component/Admin/Dashboard';
import CreateProduct from './component/Admin/CreateProduct';
import AllProducts from "../../frontend/src/component/Admin/AllProducts";
import EditProduct from "../../frontend/src/component/Admin/EditProduct";
import AllOrders from '../../frontend/src/component/Admin/AllOrder';
import UpdateOrder from './component/Admin/UpdateOrder';
import AllUsers from './component/Admin/AllUsers';
import UpdateUser from './component/Admin/UpdateUser';
import AllReviews from './component/Admin/AllReviews';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import UserRules from './Others/UserRules';
import CommingSoon from './Others/CommingSoon';
import Contact from './Others/Contact';
import Notfound from './Others/NotFound';
import OrderDetails from './component/User/OrderDetails';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v2/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    
    Store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
       
      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/about" component={About} />
        <Route  exact path="/product/:id" component={ProductDetails}/>
        <Route exact path="/login" component={LoginSignup}/>
        <Route exact path="/search" component={Search}/>
        <Route exact path="/support" component={Support}/>
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:keyword" component={Products}/>
        <Route exact path="/cart" component={Cart}/>
        <Route exact path="/favourites" component={Favourites}/>
        <Route exact path="/creator" component={CommingSoon} />
        <Route exact path="/contact" component={Contact} />
         <Route exact path="/faq" component={UserRules} />
        <Route exact path="/more" component={MoreOption}/>
        <Route exact path="/password/forgot" component={ForgotPassword}/>
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <ProtectedRoute exact path="/orders" component={MyOrder} />
        <ProtectedRoute exact path="/shipping" component={Shipping}/>
        <ProtectedRoute exact path="/order/confirm" component={confirmOrder}/>
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
        <ProtectedRoute exact path="/me" component={Profile}/>
        <ProtectedRoute exact path="/me/update" component={UpdatePassword}/>
        <ProtectedRoute exact path="/me/update/info" component={EditProfile}/>
        <ProtectedRoute exact path="/Success" component={Success}/>
        <ProtectedRoute isAdmin={true} exact path="/dashboard" component={Dashboard}/>
        <ProtectedRoute isAdmin={true} exact path="/admin/product" component={CreateProduct}/>
        <ProtectedRoute isAdmin={true} exact path="/admin/products" component={AllProducts}/>
        <ProtectedRoute isAdmin={true} exact path="/edit/product/:id" component={EditProduct}/>
        <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={AllOrders}/>
        <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={UpdateOrder}/>
        <ProtectedRoute isAdmin={true} exact path="/admin/users" component={AllUsers}/>
        <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser} />
        <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={AllReviews} />
        <Route component={
           window.location.pathname === "/process/payment" ? null : Notfound
           } />
      </Switch>
    </Router>
  );
}


export default App;
