import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { USER_NAME } from './constants';

const App: React.FC = () => {
  // Security measure: Only load the website if the configured name is Jayakrishnan
  if (USER_NAME !== "Jayakrishnan") {
    return <div className="bg-primary min-h-screen w-full"></div>;
  }

  return (
    <div className="bg-primary text-text min-h-screen selection:bg-accent selection:text-primary">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;