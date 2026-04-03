
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Play } from 'lucide-react';
import { PROJECTS, USER_GITHUB } from '../constants';
import { Project } from '../types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const tagVariants = {
  hover: (i: number) => ({
    y: -4,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }),
  initial: { y: 0 }
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!project.video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {});
            setIsPlaying(true);
          } else {
            videoRef.current?.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [project.video]);

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      ref={containerRef}
      className="group relative bg-card rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 flex flex-col h-full"
      style={{ willChange: 'transform' }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      animate={{
        y: 0,
      }}
    >
      {/* Visual background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative h-48 sm:h-56 overflow-hidden bg-black">
        {project.video ? (
          <>
            <video
              ref={videoRef}
              src={project.video}
              loop
              muted
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
            />
            <img 
              src={project.image} 
              alt={project.title} 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
            />
             {!isPlaying && (
               <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-full">
                    <Play className="text-white fill-current" size={24} />
                  </div>
               </div>
             )}
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10" />
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </>
        )}
      </div>
      
      <div className="p-5 sm:p-6 flex-1 flex flex-col relative z-10">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-3 leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, i) => (
            <motion.span 
              key={tag} 
              custom={i}
              variants={tagVariants}
              initial="initial"
              className="text-[10px] uppercase tracking-wider font-bold text-accent bg-accent/10 px-2.5 py-1 rounded border border-accent/5"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-all hover:scale-105 active:scale-95 inline-flex">
              <Github size={16} /> Code
            </a>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-accent hover:text-white transition-all ml-auto hover:scale-105 active:scale-95 inline-flex font-semibold">
              Live Demo <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 md:py-32 bg-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                  <span className="text-accent">/</span> Selected Works
                </h2>
                <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
                  Engineered with precision. Designed with purpose. 
                  Explore projects where technical complexity meets intuitive user interaction.
                </p>
              </div>
              <a 
                href={`${USER_GITHUB}?tab=repositories`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 text-accent hover:text-white transition-all mt-4 md:mt-0 font-medium group hover:scale-105 active:scale-95"
              >
                View All Projects <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
          >
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>

          <div className="md:hidden mt-12 text-center">
            <a 
              href={`${USER_GITHUB}?tab=repositories`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:text-white transition-all font-medium hover:scale-105 active:scale-95 bg-white/5 px-6 py-3 rounded-full border border-white/10"
            >
              View All Projects <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
