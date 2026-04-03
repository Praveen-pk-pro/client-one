import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-content", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-24 bg-dark relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10" ref={containerRef}>
        <div className="max-w-4xl mx-auto">
          <h2 className="about-content section-title text-3xl md:text-4xl font-heading font-bold mb-8 text-white">
            <span className="text-accent">/</span> About Me
          </h2>
          
          <div className="grid md:grid-cols-5 gap-12 items-start">
            <div className="md:col-span-3 space-y-6 text-gray-300 leading-relaxed text-lg text-justify about-content">
              <p>
                I am a passionate web design student with a strong interest in creating visually appealing and user-friendly websites. I enjoy turning ideas into clean, modern designs that provide a smooth and engaging user experience.
              </p>
              <p>
                My approach is user-first: I don’t just design websites; I create solutions that solve real problems. As a student, I focus on understanding both user needs and business goals to design meaningful digital experiences.
              </p>
              <p>
                I am a quick learner who enjoys taking on new challenges and continuously improving my skills. I am excited to grow as a designer and contribute to projects that make a difference.
              </p>
            </div>
            
            <div className="md:col-span-2 about-content">
              <div className="p-6 bg-card rounded-2xl border border-white/5 hover:border-accent/30 transition-colors shadow-lg">
                <h3 className="text-xl font-bold text-white mb-4">Key Highlights</h3>
                <ul className="space-y-3">
                  {['UI/UX Enthusiast', 'Creative Thinker', 'Detail Oriented', 'Fast Learner'].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 cursor-default">
                      <span className="w-2 h-2 bg-accent rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;