import { usePortfolio } from './context/PortfolioContext';
import SetupWizard from './components/setup/SetupWizard';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

function App() {
  const { isSetupComplete, resetPortfolio, portfolioData } = usePortfolio();

  console.log('App render - isSetupComplete:', isSetupComplete);
  console.log('App render - portfolioData:', portfolioData);

  if (!isSetupComplete) {
    return <SetupWizard />;
  }

  return (
    <div className="App relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={resetPortfolio}
        className="fixed bottom-8 right-8 z-50 p-4 bg-primary rounded-full shadow-lg hover:shadow-primary/50 transition-all"
        title="Edit Portfolio"
      >
        <Settings size={24} />
      </motion.button>

      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
