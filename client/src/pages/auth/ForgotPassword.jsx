import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
const ForgotPassword = () => {
    const [otpsent, setOtpsent] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const {toast} = useToast();
    async function submit(event) {
        event.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/forgotpassword", { email, otp, otpsent });
            if (res.data === "createfirst") {
                toast({
                    title :"Please create an account first.",
                    variant : "destructive"
                })
                navigate('/auth/register');
            } else if (res.data === "sentotp") {
                toast({
                    title :"OTP has  been sent to your email.",
                    variant : "success"
                });
                setOtpsent(true);
            } else if (res.data === "verified") {
                toast({
                    title :"Correct  OTP ",
                    variant : "success"
                });
                navigate("/auth/setnewpassword", { state: { id: email } });
            } else if (res.data === "wrongotp") {
                toast({
                    title :"Incorrect Password ",
                    variant : "destructive"
                });            }
        } catch (error) {
            console.log("Something went wrong.");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Forgot Password</h1>
            <form onSubmit={submit} className="bg-white p-8 rounded shadow-md w-96">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                {otpsent && (
                    <div className="mb-4">
                        <label htmlFor="otp" className="block text-gray-700">OTP</label>
                        <input
                            type="number"
                            maxLength={6}
                            id="otp"
                            required
                            onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                )}
                <Button
                    type="submit"
                    className="w-full py-2  text-white rounded  transition duration-200"
                >
                    {otpsent ? 'Verify OTP' : 'Send OTP'}
                </Button>
            </form>
        </div>
    );
}

export default ForgotPassword;
