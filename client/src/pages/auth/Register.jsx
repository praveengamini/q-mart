import CommonForm from '../../components/common/form';
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { registerFormControls } from '@/config';
import { useDispatch } from 'react-redux';
import { registerUser } from '@/store/auth-slice';
import { useToast } from '@/hooks/use-toast';
const initialState = {
    userName : '',
    email : '',
    password : ''
}
const AuthRegister = () => {
  const [formData,setFormData] = useState(initialState);
  const dispatch  = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast();
  function onSubmit(event)
  {
      event.preventDefault();
      dispatch(registerUser(formData)).then((data) => {
        const payload = data?.payload;
        if (payload?.success) {
          toast({
            title: payload.message,
          });
          navigate('/auth/login');
        } else {
          toast({
            title: payload?.message || "An error occurred during registration",
            variant: 'destructive',
          });
        }
      });
  }
  return (
    <div >
      <div className='mx-auto w-full max-w-md space-y-6 mb-10'>
        <div className='text-center'>
            <h1 className='text-3xl font-bold tracking-tight text-foreground select-none'>
                create new account
            </h1>
        </div>
      </div>
      <CommonForm 
      formControls={registerFormControls}
      formData={formData}
      setFormData={setFormData}
      buttonText={'Sign Up'}
      onSubmit={onSubmit}/>
      <div className='mx-auto w-full max-w-md space-y-6'>
        <div className='text-center'>
            <p className='mt-2 '>Aldready have an account? 
                <Link to='/auth/login'
                className='font-medium text-primary hover:underline ml-3'>login</Link>
            </p>
        </div>
      </div>
    </div>
  )
}

export default AuthRegister
