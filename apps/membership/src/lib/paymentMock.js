// TO BE IMPLEMENTED: Replace with Firebase Cloud Function + Razorpay
export const createOrder = async (amount) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
        id: "order_" + Math.random().toString(36).substr(2, 9),
        amount: amount * 100, // in paise
        currency: "INR"
    };
};

export const verifyPayment = async (paymentDetails) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    console.log("Verifying payment signatures...", paymentDetails);

    // Always return success for mock
    return {
        success: true,
        transactionId: "pay_" + Math.random().toString(36).substr(2, 9)
    };
};
