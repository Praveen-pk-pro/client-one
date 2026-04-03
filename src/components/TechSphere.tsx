
import React, { useEffect, useRef, useState } from 'react';
import { TECH_ICONS } from '../constants';

const TechSphere: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const hoveredIndex = useRef<number | null>(null);
  const [radius, setRadius] = useState(180);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Physics and rotation state
  const rotation = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const scrollSpeed = useRef(0);
  
  // Per-icon smoothed scale state for fluid hover transitions
  const iconScales = useRef<number[]>(new Array(TECH_ICONS.length).fill(1));
  
  // Animation config
  const baseSpeed = 0.002;
  const friction = 0.05;
  const scaleLerpFactor = 0.15; // Adjusts how "snappy" the hover scale feels

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setRadius(130);
      else if (width < 1024) setRadius(170);
      else setRadius(220);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const updateMouse = (clientX: number, clientY: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (clientX - centerX) / (window.innerWidth / 2);
      const y = (clientY - centerY) / (window.innerHeight / 2);
      
      mouse.current.x = x;
      mouse.current.y = y;
      setTilt({ x: x * 5, y: -y * 5 });
    };

    const handleMouseMove = (e: MouseEvent) => updateMouse(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) updateMouse(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleScroll = () => { scrollSpeed.current = 0.03; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll);

    const items = iconsRef.current;
    const count = TECH_ICONS.length; 
    const phi = Math.PI * (3 - Math.sqrt(5));

    items.forEach((item, i) => {
      if (!item) return;
      // Distribute icons evenly on a sphere using Fibonacci spiral
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      item.dataset.nx = x.toString();
      item.dataset.ny = y.toString();
      item.dataset.nz = z.toString();
    });

    const animate = () => {
      scrollSpeed.current *= 0.95;

      const targetVelX = mouse.current.y * 0.005; 
      const targetVelY = mouse.current.x * 0.005;

      velocity.current.x += (targetVelX - velocity.current.x) * friction;
      velocity.current.y += (targetVelY - velocity.current.y) * friction;

      rotation.current.x += velocity.current.x + scrollSpeed.current;
      rotation.current.y += velocity.current.y + baseSpeed + scrollSpeed.current;

      const cx = Math.cos(rotation.current.x);
      const sx = Math.sin(rotation.current.x);
      const cy = Math.cos(rotation.current.y);
      const sy = Math.sin(rotation.current.y);

      items.forEach((item, i) => {
        if (!item) return;
        
        const nx = parseFloat(item.dataset.nx || '0');
        const ny = parseFloat(item.dataset.ny || '0');
        const nz = parseFloat(item.dataset.nz || '0');

        // Apply 3D rotation transformations
        const ry = ny * cx - nz * sx;
        const rz1 = ny * sx + nz * cx;
        const rx = nx * cy + rz1 * sy;
        const rz = -nx * sy + rz1 * cy;

        const finalX = rx * radius;
        const finalY = ry * radius;
        const finalZ = rz * radius;

        // Calculate perspective and opacity based on Z-depth
        const perspectiveScale = 400 / (400 - finalZ);
        const alpha = (finalZ + radius) / (2 * radius);
        
        // Smooth hover scaling
        const targetScaleMultiplier = hoveredIndex.current === i ? 1.25 : 1;
        iconScales.current[i] += (targetScaleMultiplier - iconScales.current[i]) * scaleLerpFactor;
        
        const finalScale = perspectiveScale * iconScales.current[i];

        item.style.transform = `translate3d(${finalX}px, ${finalY}px, ${finalZ}px) scale(${finalScale})`;
        item.style.opacity = Math.max(0.15, alpha + 0.1).toString();
        item.style.zIndex = Math.floor(perspectiveScale * 100).toString();
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(requestRef.current);
    };
  }, [radius]); 

  return (
    <div 
      className="relative flex items-center justify-center perspective-1000"
      style={{ 
        width: radius * 2.5, 
        height: radius * 2.5,
      }}
    >
      <div 
        ref={containerRef}
        className="relative w-full h-full transform-style-3d transition-transform duration-700 ease-out"
        style={{
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`
        }}
      >
        {TECH_ICONS.map((tech, i) => (
          <div
            key={i}
            ref={(el) => { iconsRef.current[i] = el; }}
            onMouseEnter={() => { hoveredIndex.current = i; }}
            onMouseLeave={() => { hoveredIndex.current = null; }}
            className="absolute top-1/2 left-1/2 -ml-6 -mt-6 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-full shadow-lg border border-white/10 p-2 md:p-3 hover:bg-white/10 hover:border-accent hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-[border-color,background-color,box-shadow,opacity] duration-300 cursor-pointer group"
            style={{ willChange: 'transform, opacity' }}
          >
            <img 
              src={tech.url} 
              alt={tech.name} 
              className="w-full h-full object-contain pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity select-none" 
            />
            
            {/* Tooltip Name */}
            <div className="hidden md:block absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 text-white text-[10px] font-bold rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap backdrop-blur-md transform translate-y-2 group-hover:translate-y-0 z-50 uppercase tracking-widest">
              {tech.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechSphere;
