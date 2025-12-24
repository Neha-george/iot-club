
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import SectionWrapper from '../components/SectionWrapper';
import { ArrowRight } from 'lucide-react';

const Card = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 group h-full flex flex-col"
        >
            <div className="relative overflow-hidden aspect-video">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent mb-3">
                    {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 flex-grow line-clamp-3">
                    {project.description}
                </p>

                <Link
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold group/link"
                >
                    View Details
                    <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
            </div>
        </motion.div>
    );
};

const ProjectsPage = () => {
    return (
        <div className="pt-24 pb-20 min-h-screen">
            <SectionWrapper id="projects-page">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-6"
                    >
                        <span className="bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Our Projects
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
                    >
                        Discover the innovative solutions and prototypes built by our club members.
                        From robotics to IoT automation, explore the future we are building.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.map((project, index) => (
                        <Card key={project.id} project={project} index={index} />
                    ))}
                </div>
            </SectionWrapper>
        </div>
    );
};

export default ProjectsPage;
