import CommonForm from '../../components/common/form';
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { loginFormControls } from '@/config';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/auth-slice';
import { useToast } from '@/hooks/use-toast';
import { useSelector } from 'react-redux';
const initialState = {
  email : '',
  password : ''
}
const AuthLogin = () => {
  const [formData,setFormData] = useState(initialState);
  const {isAuthenticated,user} = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const {toast} = useToast();
  function onSubmit(event)
  {
      event.preventDefault();
      dispatch(loginUser(formData)).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message,
          });
        } else {
          toast({
            title: data?.payload?.message,
            variant: 'destructive',
          });
        }
      });  
  }
  return (
    <div  className='shadow-2xl '>
      <div className='mx-auto w-full max-w-md space-y-6 mb-10'>
        <div className='text-center'>
            <h1 className='text-3xl font-bold tracking-tight text-foreground select-none '>
                Login
            </h1>
        </div>
      </div>
      <CommonForm 
      formControls={loginFormControls}
      buttonText={'Login'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      forLogin = {true}
      />
      <div className='mx-auto w-full max-w-md space-y-6'>
        <div className='text-center'>
            <p className='mt-2 '>Create an Account? 
                <Link to='/auth/register'
                className='font-medium hover:text-green-500 text-primary hover:underline ml-3'>Sign Up</Link>
            </p>
        </div>
      </div>
      <div className='mx-auto w-full max-w-md space-y-6 p-3'>
        <div className='text-center'>
            <p className='p-3'>Forgot Password ?
                <Link to='/auth/forgot'
                className='font-medium hover:text-red-400 text-primary hover:underline ml-3'>Send Otp</Link>
            </p>
        </div>
      </div>
    </div>
  )
}

export default AuthLogin