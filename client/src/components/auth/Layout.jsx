import React from 'react';
import { Outlet } from 'react-router-dom';
import ParticlesComponent from '../particles';

const AuthLayout = () => {
  return (
    <div className='flex w-full min-h-screen'>
      <div className='relative flex w-1/2 justify-center items-center bg-black'>
        <ParticlesComponent />
        <h1 className='absolute text-6xl select-none text-white font-extrabold z-10'>Welcome to q-mart</h1>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 z-20">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
