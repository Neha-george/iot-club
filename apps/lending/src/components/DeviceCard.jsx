import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export default function DeviceCard({ device, onClick }) {
    const stockStatus = device.available_stock === 0 ? 'red' :
        device.available_stock <= (device.min_stock_alert || 2) ? 'orange' : 'green';

    const statusColors = {
        red: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]',
        orange: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]',
        green: 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]'
    };

    return (
        <motion.div
            layoutId={`card-${device.id}`}
            whileHover={{ y: -5 }}
            onClick={onClick}
            className="group relative bg-navy-800 rounded-lg border border-navy-700 p-6 cursor-pointer overflow-hidden transition-colors hover:border-cyan-400/50"
        >
            {/* Circuit Pattern Overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#64ffda_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="flex justify-between items-start mb-4">
                <div className="font-mono text-xs text-cyan-400/80 tracking-wider">
                    {device.model}
                </div>
                <div className={clsx("w-2 h-2 rounded-full", statusColors[stockStatus])} />
            </div>

            <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">
                {device.name}
            </h3>

            <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                {device.description}
            </p>

            <div className="flex justify-between items-end mt-auto">
                <div className="text-xs text-slate-500">
                    Stock: <span className="text-slate-300 font-mono">{device.available_stock}/{device.total_stock}</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400 text-sm font-medium">
                    View Details →
                </div>
            </div>
        </motion.div>
    );
}
