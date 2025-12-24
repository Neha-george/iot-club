import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Loader2, AlertCircle } from 'lucide-react';
import { createOrder, verifyPayment } from '../lib/paymentMock';

export default function Payment() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fee = 299;

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const data = sessionStorage.getItem('temp_member_data');
        if (!data) {
            navigate('/');
            return;
        }
        setUserData(JSON.parse(data));
    }, [navigate]);

    const handlePayment = async () => {
        setLoading(true);
        setError(null);

        try {
            // 1. Create Order
            const order = await createOrder(fee);
            console.log("Order Created:", order);

            // 2. Simulate Razorpay Checkout (Mock)
            // In real app, window.Razorpay open would happen here

            // Simulating user success action
            setTimeout(async () => {
                const dummyPaymentResponse = {
                    razorpay_payment_id: "pay_mock_123",
                    razorpay_order_id: order.id,
                    razorpay_signature: "mock_sig_123"
                };

                // 3. Verify Payment
                const verify = await verifyPayment(dummyPaymentResponse);

                if (verify.success) {
                    navigate('/success');
                } else {
                    throw new Error("Payment verification failed");
                }
            }, 2000);

        } catch (err) {
            setError(err.message || "Payment Failed");
            setLoading(false);
        }
    };

    if (!userData) return null;

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-dark-card border border-dark-border rounded-2xl w-full max-w-lg overflow-hidden shadow-xl"
            >
                <div className="bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 p-8 text-center border-b border-white/5">
                    <p className="text-neon-cyan font-mono text-sm mb-2">PAYMENT SUMMARY</p>
                    <h1 className="text-4xl font-bold text-white mb-2">₹{fee}</h1>
                    <p className="text-gray-400 text-sm">IoT Club Membership (1 Year)</p>
                </div>

                <div className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Student Name</span>
                            <span className="font-semibold">{userData.fullName}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Department</span>
                            <span className="font-semibold">{userData.department}</span>
                        </div>
                        <div className="h-px bg-white/10" />
                        <div className="flex items-start gap-3 text-sm text-gray-400 bg-black/20 p-4 rounded-lg">
                            <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
                            <p>This is a secure 256-bit encrypted transaction. No card details are stored on our servers.</p>
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <CreditCard className="w-5 h-5" />
                                Pay Now
                            </>
                        )}
                    </button>

                    <p className="text-center text-xs text-gray-600">
                        *Mock Payment Gateway: No real money will be deducted.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
