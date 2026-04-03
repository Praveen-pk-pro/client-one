import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { EXPERIENCE } from '../constants';
import { ArrowUpRight } from 'lucide-react';

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.experience-row');
      
      items.forEach((item: any, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 95%",
            toggleActions: "play none none reverse"
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out"
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="py-32 bg-primary">
      <div className="container mx-auto px-6 md:px-12" ref={containerRef}>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 border-b border-white/10 pb-8">
          <h2 className="text-5xl md:text-7xl font-sans font-bold text-white tracking-tighter">
            Experience
          </h2>
          <p className="text-gray-500 mt-6 md:mt-0 max-w-sm text-right font-mono text-sm tracking-wide uppercase">
            Career Trajectory & <br />Professional Milestones
          </p>
        </div>

        {/* Experience Grid */}
        <div className="flex flex-col">
          {EXPERIENCE.map((item) => (
            <div 
              key={item.id} 
              className="experience-row group relative border-b border-white/10 transition-all duration-500 hover:bg-white/5"
            >
              <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-8 items-start">
                
                {/* 01. Period (Monospace Technical Look) */}
                <div className="md:col-span-2">
                  <span className="inline-block px-3 py-1 rounded-full border border-white/10 font-mono text-xs text-accent/60 tracking-widest uppercase group-hover:border-accent/30 group-hover:text-accent transition-colors">
                    {item.period}
                  </span>
                </div>

                {/* 02. Role & Company (Visual Weight) */}
                <div className="md:col-span-5 relative">
                  <h3 className="text-3xl md:text-5xl font-sans font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
                    {item.role}
                  </h3>
                  <div className="flex items-center gap-2 mt-3">
                     <span className="w-2 h-2 rounded-full bg-accent/50 group-hover:bg-accent transition-colors"></span>
                     <p className="text-lg text-gray-500 group-hover:text-gray-300 font-light tracking-wide">
                      {item.company}
                    </p>
                  </div>
                </div>

                {/* 03. Description & Icon */}
                <div className="md:col-span-5 flex flex-col justify-between h-full pl-0 md:pl-10">
                  <p className="text-gray-500 leading-relaxed text-base group-hover:text-gray-300 transition-colors">
                    {item.description}
                  </p>
                  
                  {/* Hover visual cue */}
                  <div className="hidden md:flex justify-end mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                    <ArrowUpRight className="text-accent w-8 h-8" />
                  </div>
                </div>
              </div>
              
              {/* Animated Bottom Border on Hover */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;