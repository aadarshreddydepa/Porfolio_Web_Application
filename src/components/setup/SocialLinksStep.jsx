import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Globe, Twitter } from 'lucide-react';

const SocialLinksStep = ({ data, updateData, onNext, onPrev }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: data.social || {},
  });

  const onSubmit = (formData) => {
    updateData(formData, 'social');
    onNext();
  };

  const socialLinks = [
    { name: 'github', label: 'GitHub', icon: Github, placeholder: 'https://github.com/username' },
    { name: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/username' },
    { name: 'twitter', label: 'Twitter', icon: Twitter, placeholder: 'https://twitter.com/username' },
    { name: 'website', label: 'Personal Website', icon: Globe, placeholder: 'https://yourwebsite.com' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <p className="text-gray-400 mb-4">
        Add your social media profiles and contact information
      </p>

      {socialLinks.map((link, index) => (
        <motion.div
          key={link.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <label className="block text-sm font-medium mb-2 text-gray-300 flex items-center space-x-2">
            <link.icon size={18} className="text-primary" />
            <span>{link.label}</span>
          </label>
          <input
            type="url"
            {...register(link.name)}
            placeholder={link.placeholder}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-primary text-white"
          />
        </motion.div>
      ))}

      <div className="flex justify-between pt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onPrev}
          className="px-8 py-3 border-2 border-gray-600 rounded-lg font-semibold hover:border-primary transition-colors"
        >
          ← Previous
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
        >
          Preview →
        </motion.button>
      </div>
    </form>
  );
};

export default SocialLinksStep;
