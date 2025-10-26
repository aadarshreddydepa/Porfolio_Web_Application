import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Rocket, Users, Zap } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { portfolioData } = usePortfolio();
  const personal = portfolioData?.personal || {};

  const cards = [
    {
      icon: <Code size={32} />,
      title: 'Clean Code',
      description: 'Writing maintainable and scalable code following best practices',
    },
    {
      icon: <Rocket size={32} />,
      title: 'Fast Performance',
      description: 'Optimizing applications for speed and efficiency',
    },
    {
      icon: <Users size={32} />,
      title: 'Team Player',
      description: 'Collaborating effectively in agile development teams',
    },
    {
      icon: <Zap size={32} />,
      title: 'Quick Learner',
      description: 'Adapting to new technologies and frameworks rapidly',
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {personal.about || "I'm a passionate developer specializing in full-stack development and DevOps practices. I love building efficient, scalable applications and automating deployment processes."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-primary transition-all"
            >
              <div className="text-primary mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-400">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
