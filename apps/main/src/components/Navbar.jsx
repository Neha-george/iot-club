
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Cpu } from 'lucide-react';
import { clsx } from 'clsx';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Dark mode init
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }

        // Scroll handler
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        setIsDark(!isDark);
        if (!isDark) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    };

    const isHome = location.pathname === '/';

    const navLinks = [
        { name: 'About', href: isHome ? '#about' : '/#about' },
        { name: 'Domains', href: isHome ? '#domains' : '/#domains' },
        { name: 'Team', href: isHome ? '#execom' : '/#execom' },
        { name: 'Projects', href: '/projects', isRoute: true },
    ];

    return (
        <nav className={clsx(
            "fixed w-full z-50 transition-all duration-300",
            scrolled ? "bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md py-4 shadow-lg" : "bg-transparent py-6"
        )}>
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 group-hover:scale-110 transition-transform duration-300">
                        <div className="absolute inset-0 bg-neon-cyan/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                        <img src="/src/assets/logo.png" alt="IoT Logo" className="w-full h-full object-cover relative z-10" />
                    </div>
                    <span className="font-display font-bold text-xl tracking-tight dark:text-white group-hover:text-neon-cyan transition-colors">
                        IoT Club
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        link.isRoute ? (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-neon-cyan dark:hover:text-neon-cyan transition-colors"
                            >
                                {link.name}
                            </Link>
                        ) : (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-neon-cyan dark:hover:text-neon-cyan transition-colors"
                            >
                                {link.name}
                            </a>
                        )
                    ))}

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-gray-200 dark:bg-dark-border text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-neon-purple transition-colors"
                    >
                        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>

                    <a
                        href="http://localhost:5174"
                        className="px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-sm hover:scale-105 transition-transform"
                    >
                        Join Us
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-gray-800 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border overflow-hidden"
                    >
                        <div className="p-4 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                link.isRoute ? (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-medium text-gray-800 dark:text-gray-200"
                                    >
                                        {link.name}
                                    </Link>
                                ) : (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-medium text-gray-800 dark:text-gray-200"
                                    >
                                        {link.name}
                                    </a>
                                )
                            ))}
                            <div className="flex items-center justify-between mt-4 border-t border-gray-200 dark:border-dark-border pt-4">
                                <span className="text-gray-500 dark:text-gray-400">Theme</span>
                                <button
                                    onClick={toggleTheme}
                                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-dark-border"
                                >
                                    {isDark ? (
                                        <><Sun className="w-4 h-4" /> Light</>
                                    ) : (
                                        <><Moon className="w-4 h-4" /> Dark</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
