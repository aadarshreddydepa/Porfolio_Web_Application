import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 px-4 bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-gray-400 flex items-center justify-center space-x-2"
        >
          <span>Made with</span>
          <Heart size={16} className="text-red-500" fill="currentColor" />
          <span>by Your Name © 2025</span>
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
