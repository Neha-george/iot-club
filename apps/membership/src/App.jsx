import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Register from './pages/Register';
import Payment from './pages/Payment';
import Success from './pages/Success';

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Register />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/success" element={<Success />} />
            </Routes>
        </AnimatePresence>
    );
}

import Navbar from './components/Navbar';

function App() {
    return (
        <div className="min-h-screen bg-dark-bg text-white font-sans selection:bg-neon-cyan selection:text-black">
            <Router>
                <Navbar />
                <AnimatedRoutes />
            </Router>
        </div>
    );
}

export default App;
