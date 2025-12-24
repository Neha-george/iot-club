import React from 'react';

export default function Background() {
    return (
        <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none">
            {/* Dark Base */}
            <div className="absolute inset-0 bg-navy-950" />

            {/* Animated Blobs */}
            <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
            <div className="absolute top-[20%] -right-[10%] w-[70vw] h-[70vw] bg-cyan-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-[20%] left-[20%] w-[70vw] h-[70vw] bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>
    );
}
