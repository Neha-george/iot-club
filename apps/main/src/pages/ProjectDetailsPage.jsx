
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Cpu, FileText, Code } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import SectionWrapper from '../components/SectionWrapper';

const ProjectDetailsPage = () => {
    const { id } = useParams();
    const project = projectsData.find(p => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
                <Link to="/projects" className="text-cyan-500 hover:underline">Back to Projects</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20">
            <SectionWrapper>
                {/* Back Link */}
                <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Projects
                </Link>

                {/* Header */}
                <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-auto object-cover"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
                            {project.title}
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                            {project.description}
                        </p>

                        {/* Quick Stats or Tags could go here */}
                        {project.details?.components && (
                            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                                <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 text-purple-600 dark:text-purple-400">
                                    <Cpu className="w-5 h-5" /> Components Used
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.details.components.map((comp, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300">
                                            {comp}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Detailed Content */}
                {project.details ? (
                    <div className="max-w-4xl mx-auto space-y-12">

                        {/* Introduction */}
                        {project.details.intro && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="prose dark:prose-invert max-w-none"
                            >
                                <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                                    <FileText className="w-6 h-6 text-cyan-500" />
                                    Introduction
                                </h2>
                                <p className="text-lg leading-relaxed">{project.details.intro}</p>
                            </motion.section>
                        )}

                        {/* Custom Sections */}
                        {project.details.sections?.map((section, idx) => (
                            <motion.section
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-bold">{section.title}</h2>
                                <p className="text-lg text-slate-600 dark:text-slate-300 whitespace-pre-line">
                                    {section.content}
                                </p>
                                {section.images && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {section.images.map((img, imgIdx) => (
                                            <img
                                                key={imgIdx}
                                                src={img}
                                                alt={`${section.title} illustration ${imgIdx + 1}`}
                                                className="rounded-lg shadow-md w-full h-auto"
                                            />
                                        ))}
                                    </div>
                                )}
                            </motion.section>
                        ))}

                        {/* Working (Old format support) */}
                        {project.details.working && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-bold">How it Works</h2>
                                {project.details.working.text.map((p, idx) => (
                                    <p key={idx} className="text-lg text-slate-600 dark:text-slate-300">
                                        {p}
                                    </p>
                                ))}
                                {project.details.working.images && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                        {project.details.working.images.map((img, imgIdx) => (
                                            <img
                                                key={imgIdx}
                                                src={img}
                                                alt={`Working illustration ${imgIdx + 1}`}
                                                className="rounded-lg shadow-md w-full h-auto"
                                            />
                                        ))}
                                    </div>
                                )}
                            </motion.section>
                        )}


                        {/* Code Snippet */}
                        {project.details.code && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                            >
                                <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
                                    <Code className="w-6 h-6 text-cyan-500" />
                                    Code / Firmware
                                </h2>
                                <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl relative group">
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => navigator.clipboard.writeText(project.details.code)}
                                            className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded-full backdrop-blur-sm transition-colors"
                                        >
                                            Copy Code
                                        </button>
                                    </div>
                                    <pre className="p-6 overflow-x-auto text-sm font-mono text-slate-300">
                                        <code>{project.details.code}</code>
                                    </pre>
                                </div>
                            </motion.section>
                        )}

                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <p className="text-xl text-slate-500">Detailed case study coming soon.</p>
                    </div>
                )}

            </SectionWrapper>
        </div>
    );
};

export default ProjectDetailsPage;
