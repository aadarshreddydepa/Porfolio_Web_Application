import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';

const PersonalInfoStep = ({ data, updateData, onNext }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: data.personal || {},
  });

  const onSubmit = (formData) => {
    updateData(formData, 'personal');
    onNext();
  };

  const inputFields = [
    { name: 'fullName', label: 'Full Name', icon: User, placeholder: 'John Doe', required: true },
    { name: 'email', label: 'Email', icon: Mail, placeholder: 'john@example.com', type: 'email', required: true },
    { name: 'phone', label: 'Phone', icon: Phone, placeholder: '+91 1234567890' },
    { name: 'location', label: 'Location', icon: MapPin, placeholder: 'Mumbai, India' },
    { name: 'title', label: 'Professional Title', icon: Briefcase, placeholder: 'Full Stack Developer', required: true },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {inputFields.map((field, index) => (
        <motion.div
          key={field.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <label className="block text-sm font-medium mb-2 text-gray-300">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          <div className="relative">
            <field.icon className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type={field.type || 'text'}
              {...register(field.name, { 
                required: field.required ? `${field.label} is required` : false 
              })}
              placeholder={field.placeholder}
              className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-primary transition-colors text-white"
            />
          </div>
          {errors[field.name] && (
            <p className="text-red-500 text-sm mt-1">{errors[field.name].message}</p>
          )}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <label className="block text-sm font-medium mb-2 text-gray-300">
          About Me <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('about', { required: 'About section is required' })}
          rows="4"
          placeholder="Tell us about yourself, your passion, and what you do..."
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-primary transition-colors text-white resize-none"
        />
        {errors.about && (
          <p className="text-red-500 text-sm mt-1">{errors.about.message}</p>
        )}
      </motion.div>

      <div className="flex justify-end pt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
        >
          Next Step →
        </motion.button>
      </div>
    </form>
  );
};

export default PersonalInfoStep;
