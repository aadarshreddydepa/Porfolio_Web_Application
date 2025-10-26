import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Plus, Trash2, Code } from 'lucide-react';

const SkillsStep = ({ data, updateData, onNext, onPrev }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      skillCategories: data.skills.length > 0 ? data.skills : [
        { category: '', skills: [{ name: '', level: 80 }] }
      ],
    },
  });

  const { fields: categories, append: appendCategory, remove: removeCategory } = useFieldArray({
    control,
    name: 'skillCategories',
  });

  const onSubmit = (formData) => {
    updateData(formData.skillCategories, 'skills');
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <p className="text-gray-400 mb-4">
        Add your skills grouped by categories (e.g., Frontend, Backend, DevOps)
      </p>

      {categories.map((category, categoryIndex) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-700/50 rounded-lg p-6 border border-gray-600"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 mr-4">
              <input
                type="text"
                {...register(`skillCategories.${categoryIndex}.category`, {
                  required: 'Category name is required',
                })}
                placeholder="Category (e.g., Frontend)"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-primary text-white"
              />
              {errors.skillCategories?.[categoryIndex]?.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.skillCategories[categoryIndex].category.message}
                </p>
              )}
            </div>
            {categories.length > 1 && (
              <button
                type="button"
                onClick={() => removeCategory(categoryIndex)}
                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>

          <SkillsList
            categoryIndex={categoryIndex}
            register={register}
            control={control}
            errors={errors}
          />
        </motion.div>
      ))}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={() => appendCategory({ category: '', skills: [{ name: '', level: 80 }] })}
        className="w-full py-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:border-primary hover:text-primary transition-colors flex items-center justify-center space-x-2"
      >
        <Plus size={20} />
        <span>Add Category</span>
      </motion.button>

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
          Next Step →
        </motion.button>
      </div>
    </form>
  );
};

const SkillsList = ({ categoryIndex, register, control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `skillCategories.${categoryIndex}.skills`,
  });

  return (
    <div className="space-y-3">
      {fields.map((skill, skillIndex) => (
        <div key={skill.id} className="flex items-center space-x-3">
          <div className="flex-1">
            <input
              type="text"
              {...register(`skillCategories.${categoryIndex}.skills.${skillIndex}.name`, {
                required: 'Skill name is required',
              })}
              placeholder="Skill name (e.g., React)"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-primary text-white"
            />
          </div>
          <div className="w-32">
            <input
              type="number"
              {...register(`skillCategories.${categoryIndex}.skills.${skillIndex}.level`, {
                required: true,
                min: 0,
                max: 100,
              })}
              placeholder="Level %"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-primary text-white"
            />
          </div>
          {fields.length > 1 && (
            <button
              type="button"
              onClick={() => remove(skillIndex)}
              className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ name: '', level: 80 })}
        className="text-primary hover:text-secondary transition-colors flex items-center space-x-2 text-sm"
      >
        <Plus size={16} />
        <span>Add Skill</span>
      </button>
    </div>
  );
};

export default SkillsStep;
