// import Home from "./routes/Home/home.component";
import {Routes, Route} from "react-router-dom";
// import Navigation from "./routes/Navigation/navigation.component";
// import Authentication from "./routes/authentication/authentication.component";
// import Shop from "./components/shop/shop.component";
// import Checkout from "./components/checkout/checkout.component";
import {lazy, Suspense, useEffect} from "react";
import {useDispatch} from "react-redux";
import {checkUserSession} from "./features/user/user.action";
import Spinner from "./components/spinner/spinner.component";
import { GlobalStyle } from './global.styles';

const Navigation = lazy(()=>import('./routes/Navigation/navigation.component'))
const Home = lazy(()=>import('./routes/Home/home.component'))
const Authentication = lazy(()=>import('./routes/authentication/authentication.component'))
const Shop = lazy(()=>import('./components/shop/shop.component'))
const Checkout = lazy(()=>import('./components/checkout/checkout.component'))

const App = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(checkUserSession())
    },[]);


    return (
        <div>
            <GlobalStyle/>
            <Suspense fallback={<Spinner/>}>
                <Routes>
                    <Route path='/' element={<Navigation/>}>
                        <Route index element={<Home/>}/>
                        <Route path='auth' element={<Authentication/>}/>
                        <Route path='shop/*' element={<Shop/>}/>
                        <Route path='checkout' element={<Checkout/>}/>
                    </Route>
                </Routes>
            </Suspense>
        </div>
  ) ;
}

export default App;
