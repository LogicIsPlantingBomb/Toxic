import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  const bgRef = useRef(null);
  const [ripples, setRipples] = useState([]);
  const [featuredOpinions, setFeaturedOpinions] = useState([
    {
      id: 1,
      text: "Pineapple belongs on pizza and improves the flavor profile.",
      author: "Anonymous Warrior",
      votes: 243,
      comments: 78,
      survived: "3 days"
    },
    {
      id: 2,
      text: "Movie theaters should ban cell phones completely.",
      author: "Shadow Fighter",
      votes: -156,
      comments: 142,
      survived: "5 hours"
    },
    {
      id: 3,
      text: "Coffee is overrated and tastes objectively bad.",
      author: "Truth Bomber",
      votes: 67,
      comments: 213,
      survived: "2 days"
    }
  ]);

  // Subtle background animation
  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    let frameCount = 0;
    let animationId;

    const animate = () => {
      frameCount++;
      const noiseX = Math.sin(frameCount * 0.005) * 2;
      const noiseY = Math.cos(frameCount * 0.005) * 2;
      
      bg.style.backgroundPosition = `
        ${50 + noiseX}% ${50 + noiseY}%
      `;
      
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Ripple effect on click
  const handleBackgroundClick = (e) => {
    const { clientX, clientY } = e;
    const newRipple = {
      x: clientX,
      y: clientY,
      id: Date.now()
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const cardVariants = {
    hover: { 
      scale: 1.03,
      boxShadow: "0 10px 15px -5px rgba(220, 38, 38, 0.3)",
      borderColor: "rgba(239, 68, 68, 0.7)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(239, 68, 68, 0.9)",
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <div 
      ref={bgRef}
      onClick={handleBackgroundClick}
      className="relative min-h-screen flex flex-col overflow-hidden cursor-crosshair"
      style={{
        background: `
          linear-gradient(135deg, 
            rgba(17, 24, 39, 0.95) 0%, 
            rgba(31, 41, 55, 0.95) 100%),
          url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ef4444' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")
        `,
        backgroundSize: 'cover, 300px 300px',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Blood-like water ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
            width: 100,
            height: 100,
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%)',
            transform: 'scale(0)',
          }}
          animate={{ 
            scale: 3,
            opacity: [0.8, 0]
          }}
          transition={{ 
            duration: 1,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Navigation Bar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="bg-black/80 backdrop-blur-md border-b border-red-900/50 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent tracking-wider">UNPOPULAR ARENA</h1>
            </motion.div>
            <div className="flex space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
              >
                <Link 
                  to="/login"
                  className="text-gray-300 px-3 py-2 uppercase text-sm font-medium hover:text-red-400 transition-colors"
                >
                  Login
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to="/register"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-4 py-2 rounded-md uppercase text-sm font-medium transition-all shadow-md shadow-red-900/30"
                >
                  Register
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative flex-grow flex flex-col justify-center items-center text-center px-4 py-16"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent uppercase tracking-tight"
        >
          Unpopular Opinions
        </motion.h1>
        
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-5xl font-bold mb-8 text-white uppercase tracking-tight"
        >
          Battle Arena
        </motion.h2>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg text-gray-300 max-w-2xl mb-12 leading-relaxed"
        >
          Where controversial opinions face public judgment. Post your hottest takes anonymously and watch them survive or perish.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <motion.button
            variants={buttonVariants}
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium uppercase tracking-wider rounded-md shadow-lg"
          >
            <Link to="/register" className="flex items-center justify-center">
              Join The Arena
            </Link>
          </motion.button>
          
          <motion.button
            whileHover={{ 
              scale: 1.05,
              borderColor: "rgba(239, 68, 68, 0.9)",
              backgroundColor: "rgba(239, 68, 68, 0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-transparent border-2 border-red-600 text-red-400 font-medium uppercase tracking-wider rounded-md"
          >
            <Link to="/battles" className="flex items-center justify-center">
              View Battles
            </Link>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Featured Opinions */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-black/60 backdrop-blur-sm py-16 border-t border-b border-gray-800"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h3 
            className="text-3xl font-bold text-center mb-12 text-red-400 uppercase tracking-wider"
            whileHover={{ scale: 1.01 }}
          >
            Current Battlefield
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredOpinions.map((opinion) => (
              <motion.div
                key={opinion.id}
                className="p-6 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg"
                variants={cardVariants}
                whileHover="hover"
              >
                <p className="text-gray-200 mb-4">"{opinion.text}"</p>
                
                <div className="flex justify-between items-center text-gray-400 text-sm mb-2">
                  <span className="font-mono text-xs">{opinion.author}</span>
                  <span className={`font-bold ${opinion.votes >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {opinion.votes > 0 ? '+' : ''}{opinion.votes}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>
                    {opinion.comments} comments
                  </span>
                  <span>
                    Survived: <span className="text-red-400">{opinion.survived}</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-6 py-2 bg-transparent border-2 border-red-600 text-red-400 font-medium uppercase tracking-wider text-sm rounded-md"
            >
              View All Battles
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-16 px-4"
      >
        <div className="max-w-5xl mx-auto">
          <motion.h3 
            className="text-3xl font-bold text-center mb-12 text-red-400 uppercase tracking-wider"
            whileHover={{ scale: 1.01 }}
          >
            How The Arena Works
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Post Anonymously",
                description: "Share your controversial opinions without revealing your identity.",
                icon: "🕵️‍♂️"
              },
              {
                title: "Battle for Survival",
                description: "Opinions must maintain positive votes to stay in the arena.",
                icon: "⚔️"
              },
              {
                title: "Climb the Ranks",
                description: "The most engaging and controversial battles rise to the top.",
                icon: "🏆"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 p-6 rounded-lg border border-gray-800"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h4 className="text-xl font-bold text-red-400 mb-3">{item.title}</h4>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 text-center bg-black/60 backdrop-blur-sm border-t border-b border-gray-800"
      >
        <div className="max-w-2xl mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-6 text-red-400 uppercase tracking-wider"
            whileHover={{ scale: 1.01 }}
          >
            Ready to Battle?
          </motion.h2>
          
          <p className="text-gray-300 mb-8">
            Enter the arena and let your opinions face the ultimate test.
          </p>
          
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium uppercase tracking-wider rounded-md shadow-lg"
          >
            <Link to="/register" className="flex items-center justify-center">
              Join Now
            </Link>
          </motion.button>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="bg-black/80 backdrop-blur-sm py-8 border-t border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <p className="uppercase tracking-wider">
            © 2025 Unpopular Arena. All rights reserved.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;
