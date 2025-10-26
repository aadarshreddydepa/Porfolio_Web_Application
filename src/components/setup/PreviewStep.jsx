import { motion } from 'framer-motion';
import { CheckCircle, Edit } from 'lucide-react';

const PreviewStep = ({ data, onPrev, onComplete }) => {
  return (
    <div className="space-y-6">
      <p className="text-gray-400 mb-6">
        Review your portfolio information before generating
      </p>

      {/* Personal Info Preview */}
      <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
        <h3 className="text-xl font-bold mb-4 text-primary">Personal Information</h3>
        <div className="space-y-2 text-gray-300">
          <p><strong>Name:</strong> {data.personal?.fullName || 'Not provided'}</p>
          <p><strong>Email:</strong> {data.personal?.email || 'Not provided'}</p>
          <p><strong>Title:</strong> {data.personal?.title || 'Not provided'}</p>
          <p><strong>Location:</strong> {data.personal?.location || 'Not provided'}</p>
        </div>
      </div>

      {/* Skills Preview */}
      <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
        <h3 className="text-xl font-bold mb-4 text-primary">Skills</h3>
        {data.skills && data.skills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.skills.map((category, index) => (
              <div key={index}>
                <h4 className="font-semibold text-white mb-2">{category.category}</h4>
                <ul className="text-gray-400 text-sm space-y-1">
                  {category.skills?.map((skill, idx) => (
                    <li key={idx}>{skill.name} - {skill.level}%</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No skills added</p>
        )}
      </div>

      {/* Projects Preview */}
      <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
        <h3 className="text-xl font-bold mb-4 text-primary">Projects</h3>
        <p className="text-gray-400">
          {data.projects?.length || 0} project(s) added
        </p>
        {data.projects && data.projects.length > 0 && (
          <ul className="mt-2 space-y-1">
            {data.projects.map((project, idx) => (
              <li key={idx} className="text-gray-300">• {project.title}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Social Links Preview */}
      <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
        <h3 className="text-xl font-bold mb-4 text-primary">Social Links</h3>
        <div className="space-y-2 text-gray-300 text-sm">
          {data.social && Object.entries(data.social).filter(([_, value]) => value).length > 0 ? (
            Object.entries(data.social).map(([key, value]) => (
              value && <p key={key}><strong className="capitalize">{key}:</strong> {value}</p>
            ))
          ) : (
            <p className="text-gray-400">No social links added</p>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onPrev}
          className="px-8 py-3 border-2 border-gray-600 rounded-lg font-semibold hover:border-primary transition-colors flex items-center space-x-2"
        >
          <Edit size={20} />
          <span>← Edit</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onComplete}
          className="px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center space-x-2"
        >
          <CheckCircle size={20} />
          <span>Generate Portfolio</span>
        </motion.button>
      </div>
    </div>
  );
};

export default PreviewStep;
