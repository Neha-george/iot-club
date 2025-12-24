import React from 'react';

export default function Background() {
    return (
        <div className="fixed inset-0 min-h-screen w-full -z-10 overflow-hidden bg-gray-50 dark:bg-dark-bg transition-colors duration-500">
            {/* Light Mode Blobs */}
            <div className="dark:opacity-0 transition-opacity duration-1000">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
                <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
                <div className="absolute inset-0 bg-grid-slate-200/[0.2] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
            </div>

            {/* Dark Mode Overlay */}
            <div className="opacity-0 dark:opacity-100 transition-opacity duration-1000 absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
            </div>
        </div>
    );
}
