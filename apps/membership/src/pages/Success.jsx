import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { Download, CheckCircle, Share2, Home } from 'lucide-react';
import MembershipCard from '../components/MembershipCard';
import { generateMembershipId } from '../lib/membershipIdMock';

export default function Success() {
    const cardRef = useRef(null);
    const [member, setMember] = useState(null);

    useEffect(() => {
        const data = sessionStorage.getItem('temp_member_data');
        if (data) {
            const userData = JSON.parse(data);
            // Generate ID
            const newId = generateMembershipId();
            setMember({ ...userData, id: newId });

            // FUTURE: Save to Firestore here
        }
    }, []);

    const handleDownload = async () => {
        if (cardRef.current === null) return;

        try {
            const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
            const link = document.createElement('a');
            link.download = `IOT-Club-Membership-${member.fullName}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error(err);
        }
    };

    if (!member) return null;

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 bg-grid-pattern">
            <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">

                {/* Visuals */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="order-2 md:order-1 flex flex-col items-center"
                >
                    <div className="relative group cursor-pointer mb-8" onClick={handleDownload}>
                        {/* The Card Component to be Captured */}
                        <MembershipCard ref={cardRef} member={member} />

                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl backdrop-blur-sm">
                            <span className="text-white font-bold flex items-center gap-2">
                                <Download className="w-5 h-5" /> Click to Download
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Success Message */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="order-1 md:order-2 space-y-6 text-center md:text-left"
                >
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-6">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>

                    <h1 className="text-4xl font-display font-bold">Welcome to the Club!</h1>
                    <p className="text-gray-400 text-lg">
                        Your registration was successful. You are now an official member of the IoT Club.
                    </p>

                    <div className="bg-dark-card border border-dark-border p-4 rounded-xl inline-block text-left w-full">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Your Membership ID</p>
                        <p className="text-neon-cyan font-mono text-xl">{member.id}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            onClick={handleDownload}
                            className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                        >
                            <Download className="w-4 h-4" /> Download Card
                        </button>
                        <button
                            className="px-6 py-3 border border-dark-border text-gray-300 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                        >
                            <Share2 className="w-4 h-4" /> Share
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
