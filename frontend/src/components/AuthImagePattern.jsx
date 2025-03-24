






import { motion } from "framer-motion";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 min-h-screen p-12 relative overflow-hidden">
      {/* Floating glowing elements for background effect */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400 opacity-30 blur-3xl animate-pulse"></div>

      <div className="max-w-md text-center">
        {/* Animated Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8 relative">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
              whileHover={{ scale: 1.2, boxShadow: "0px 0px 15px rgba(255,255,255,0.8)" }}
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg`}
            />
          ))}
        </div>

        {/* Title with 3D Effect */}
        <motion.h2
          className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          {title}
        </motion.h2>

        {/* Subtitle with subtle fade-in effect */}
        <motion.p
          className="text-base-content/80 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
};

export default AuthImagePattern;

  
  