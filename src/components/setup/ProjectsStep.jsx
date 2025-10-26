import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Plus, Trash2, FolderGit2 } from 'lucide-react';

const ProjectsStep = ({ data, updateData, onNext, onPrev }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      projects: data.projects.length > 0 ? data.projects : [
        { title: '', description: '', tech: '', github: '', live: '', image: '' }
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });

  const onSubmit = (formData) => {
    // Convert comma-separated tech string to array
    const processedProjects = formData.projects.map(project => ({
      ...project,
      tech: project.tech.split(',').map(t => t.trim()).filter(t => t),
    }));
    updateData(processedProjects, 'projects');
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <p className="text-gray-400 mb-4">
        Showcase your best projects with descriptions, technologies, and links
      </p>

      {fields.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-700/50 rounded-lg p-6 border border-gray-600"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <FolderGit2 size={20} className="text-primary" />
              <span>Project {index + 1}</span>
            </h3>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="text"
                {...register(`projects.${index}.title`, {
                  required: 'Project title is required',
                })}
                placeholder="Project Title"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-primary text-white"
              />
              {errors.projects?.[index]?.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.projects[index].title.message}
                </p>
              )}
            </div>

            <div>
              <textarea
                {...register(`projects.${index}.description`, {
                  required: 'Description is required',
                })}
                rows="3"
                placeholder="Project Description"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-primary text-white resize-none"
              />
              {errors.projects?.[index]?.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.projects[index].description.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                {...register(`projects.${index}.tech`, {
                  required: 'Technologies are required',
                })}
                placeholder="Technologies (comma-separated, e.g., React, Node.js, MongoDB)"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-primary text-white"
              />
              {errors.projects?.[index]?.tech && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.projects[index].tech.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="url"
                {...register(`projects.${index}.github`)}
                placeholder="GitHub URL (optional)"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-primary text-white"
              />
              <input
                type="url"
                {...register(`projects.${index}.live`)}
                placeholder="Live Demo URL (optional)"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-primary text-white"
              />
            </div>

            <div>
              <input
                type="url"
                {...register(`projects.${index}.image`)}
                placeholder="Project Image URL (optional, use placeholder if empty)"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-primary text-white"
              />
            </div>
          </div>
        </motion.div>
      ))}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={() => append({ title: '', description: '', tech: '', github: '', live: '', image: '' })}
        className="w-full py-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:border-primary hover:text-primary transition-colors flex items-center justify-center space-x-2"
      >
        <Plus size={20} />
        <span>Add Project</span>
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

export default ProjectsStep;
