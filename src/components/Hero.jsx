import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, Globe, Twitter } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Hero = () => {
  const { portfolioData } = usePortfolio();
  const personal = portfolioData?.personal || {};
  const social = portfolioData?.social || {};

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    website: Globe,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="text-primary text-lg font-semibold">Hey!👋🏻 This is </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6"
        >

          <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            {personal.fullName || 'Your Name'}
          </span>
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-semibold text-gray-300 mb-8"
        >
          {personal.title || 'Full Stack Developer & DevOps Engineer'}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-400 max-w-2xl mx-auto mb-12"
        >
          {personal.about || 'Passionate about building scalable applications'}
        </motion.p>

        <motion.div variants={itemVariants} className="flex justify-center space-x-6 mb-12">
          {Object.entries(social).map(([platform, url]) => {
            if (!url) return null;
            const Icon = socialIcons[platform] || Mail;
            return (
              <motion.a
                key={platform}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-full hover:bg-primary transition-colors"
              >
                <Icon size={24} />
              </motion.a>
            );
          })}
          {personal.email && (
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={`mailto:${personal.email}`}
              className="p-3 bg-gray-800 rounded-full hover:bg-primary transition-colors"
            >
              <Mail size={24} />
            </motion.a>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center space-x-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#projects"
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
          >
            View My Work
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="px-8 py-3 border-2 border-primary rounded-lg font-semibold hover:bg-primary/10 transition-all"
          >
            Contact Me
          </motion.a>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown size={32} className="text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
