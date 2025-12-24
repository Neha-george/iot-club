import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from local storage on init
    useEffect(() => {
        const savedCart = localStorage.getItem('iot-cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to local storage on change
    useEffect(() => {
        localStorage.setItem('iot-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    function addToCart(device, quantity) {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === device.id);
            if (existing) {
                // Update quantity but don't exceed available stock
                const newQuantity = Math.min(existing.quantity + quantity, device.available_stock);
                return prev.map(item =>
                    item.id === device.id ? { ...item, quantity: newQuantity } : item
                );
            }
            return [...prev, { ...device, quantity }];
        });
        setIsCartOpen(true);
    }

    function removeFromCart(deviceId) {
        setCartItems(prev => prev.filter(item => item.id !== deviceId));
    }

    function updateQuantity(deviceId, newQuantity) {
        setCartItems(prev => prev.map(item => {
            if (item.id === deviceId) {
                return { ...item, quantity: Math.max(1, Math.min(newQuantity, item.available_stock)) };
            }
            return item;
        }));
    }

    function clearCart() {
        setCartItems([]);
    }

    const value = {
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
