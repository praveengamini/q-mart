import React, { useEffect } from 'react'
import AuthLayout from './components/auth/Layout'
import AuthRegister from './pages/auth/Register'
import AuthLogin from './pages/auth/Login'
import {Routes,Route} from 'react-router-dom'
import Adminlayout from './components/admin-view/layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminOrders from './pages/admin-view/orders'
import AdminProducts from './pages/admin-view/products'
import AdminFeatures from './pages/admin-view/features'
import ShoppingLayout from './components/shopping-view/layout'
import NotFound from './pages/not-found'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingListing from './pages/shopping-view/listing'
import ShoppingAccount from './pages/shopping-view/account'
import ShoppingCheckout from './pages/shopping-view/checkout'
import CheckAuth from './components/common/check-auth'
import UnauthPage from './pages/unauth-page'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/auth-slice'
import { Skeleton } from "@/components/ui/skeleton"
import ForgotPassword from './pages/auth/ForgotPassword'
import SetNewPassword from './pages/auth/SetNewPassword'
const App = () => {
  const dispatch = useDispatch();
  const {isAuthenticated,user,isLoading} = useSelector((state) => state.auth)
  useEffect(()=>{ 
    dispatch(checkAuth())
  },[])
  if(isLoading)
  {
    return <Skeleton className="w-[800] bg-black h-[600] " />
  }
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        <Route path="/auth" element={<CheckAuth  isAuthenticated = {isAuthenticated}
          user = {user}>
          <AuthLayout />
        </CheckAuth>}>
        <Route path="login" element={<AuthLogin />}/>
        <Route path="register" element={<AuthRegister />}/>
        <Route path="forgot" element={<ForgotPassword />}/>
        <Route path="setnewpassword" element={<SetNewPassword />}/>
        
        </Route>
        <Route path='/admin' element={<CheckAuth   isAuthenticated = {isAuthenticated}
            user = {user}>
          <Adminlayout/>
        </CheckAuth>}>
        <Route path='products' element = {<AdminProducts/>} />
        <Route path='orders' element={<AdminOrders/>}/>
        <Route path='dashboard' element={<AdminDashboard/>}/>
        <Route path='features' element = {<AdminFeatures/>}/>
        </Route>
        <Route path='/shop' element = {<CheckAuth    isAuthenticated = {isAuthenticated}
              user = {user}>
          <ShoppingLayout/>
        </CheckAuth>}>
        <Route path='home' element={<ShoppingHome/>}/>
        <Route path='listing' element={<ShoppingListing/>}/>
        <Route path='account' element={<ShoppingAccount/>}/>
        <Route path='checkout' element={<ShoppingCheckout/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
        <Route path='/unauth-page' element = {<UnauthPage/>}/>
      </Routes>
    </div>
  )
}

export default App
