import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useToast,toast } from '@/hooks/use-toast';
const SetNewPassword = () => {
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [message, setMessage] = useState(""); 
  const email = location.state?.id;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const  { toast } = useToast();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  }

  async function submit(event) {
    event.preventDefault();

    if (password !== repassword) {
      toast({
        title: "Passwords do not match.",
        variant: 'destructive',
    })
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/setnewpassword", { email, password });
      
      if (res.data === "success") {
        toast({
            title: "Password updated successfully",
        })
        navigate('/auth/login'); 
      } else {
        if (res.data === "success") {
            toast({
                title: "Failed to update password. Please try again.",
                variant: 'destructive',
            })
      }
    }
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("An error occurred while updating the password. Please try again.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      {email ? (
        <form onSubmit={submit} className="bg-white p-8 rounded shadow-md w-96">
          <h1 className="text-2xl font-bold mb-4">Set New Password</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              type="email"
              readOnly
              value={email}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">New Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              required
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={togglePasswordVisibility}
                className="mr-2"
              />
              <label htmlFor="showPassword" className="text-gray-600">Show Password</label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="re-enter" className="block text-gray-700">Re-enter Password:</label>
            <input
              id="re-enter"
              required
              type={showPassword2 ? 'text' : 'password'}
              onChange={(event) => setRePassword(event.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="showPassword2"
                checked={showPassword2}
                onChange={togglePasswordVisibility2}
                className="mr-2"
              />
              <label htmlFor="showPassword2" className="text-gray-600">Show Password</label>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full py-2 text-white rounded transition duration-200"
          >
            Set New Password
          </Button>
          {message && <p className="text-red-500 mt-4">{message}</p>}
        </form>
      ) : (
        <h1 className="text-red-500">You don't have access to this page</h1>
      )}
    </div>
  );
};

export default SetNewPassword;
