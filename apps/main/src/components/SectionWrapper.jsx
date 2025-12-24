import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export default function SectionWrapper({ children, id, className, delay = 0 }) {
    return (
        <section id={id} className={clsx("py-20 px-4 md:px-8 relative overflow-hidden", className)}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay, ease: "easeOut" }}
                className="container mx-auto max-w-7xl relative z-10"
            >
                {children}
            </motion.div>
        </section>
    );
}
