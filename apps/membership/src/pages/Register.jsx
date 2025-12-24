import React from 'react';
import { motion } from 'framer-motion';
import MembershipForm from '../components/MembershipForm';
import { Cpu } from 'lucide-react';

export default function Register() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Side - Visuals */}
            <div className="md:w-1/2 bg-black relative overflow-hidden p-12 flex flex-col justify-between min-h-[300px]">
                <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan text-sm mb-6">
                        <Cpu className="w-4 h-4" />
                        <span>MACE IOT CLUB</span>
                    </div>
                    <h1 className="text-5xl font-display font-bold leading-tight mb-4">
                        Join the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">Revolution</span>
                    </h1>
                    <p className="text-gray-400 max-w-md">
                        Unlock access to workshops, hackathons, and our exclusive component library. Build the future with us.
                    </p>
                </div>

                <div className="relative z-10 hidden md:block">
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800" />
                            ))}
                        </div>
                        <p className="text-sm text-gray-500">200+ Members joined this year</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="md:w-1/2 bg-dark-bg p-8 md:p-12 lg:p-16 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold mb-2">Member Registration</h2>
                        <p className="text-gray-500">Fill in your details to get started.</p>
                    </motion.div>

                    <MembershipForm />
                </div>
            </div>
        </div>
    );
}
