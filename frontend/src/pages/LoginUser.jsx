import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const ArenaLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const bgRef = useRef(null);
  const [ripples, setRipples] = useState([]);

  // Watery background effect
  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    let frameCount = 0;
    let animationId;

    const animate = () => {
      frameCount++;
      const noise = Array.from({ length: 3 }, (_, i) => {
        return Math.sin((frameCount * 0.02) + (i * 2)) * 50 + 50;
      });
      
      bg.style.backgroundPosition = `
        ${noise[0]}% ${noise[1]}%,
        ${100 - noise[1]}% ${100 - noise[0]}%,
        ${noise[2]}% ${100 - noise[2]}%
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Important for cookie handling
      });

      const data = await response.json();

      if (!response.ok) {
        setIsError(true);
        if (data.errors) {
          setMessage(data.errors[0].msg);
        } else {
          setMessage(data.message || "INVALID WAR CREDENTIALS");
        }
        return;
      }

      // Login successful
      setMessage("IDENTITY CONFIRMED. ENTERING ARENA...");
      
      // Store token in localStorage if remember me is checked
      if (rememberMe && data.token) {
        localStorage.setItem('token', data.token);
      }

      // Store user data if needed
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // Redirect after successful login
      setTimeout(() => {
        navigate('/'); // or wherever you want to redirect after login
      }, 2000);

    } catch (error) {
      setIsError(true);
      setMessage("COMMUNICATIONS FAILURE. RETRY.");
      console.error("Login error:", error);
    }
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

  return (
    <div 
      ref={bgRef}
      onClick={handleBackgroundClick}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900 cursor-crosshair"
      style={{
        background: `
          radial-gradient(circle at 20% 30%, rgba(239, 68, 68, 0.1) 0%, transparent 25%),
          radial-gradient(circle at 80% 70%, rgba(239, 68, 68, 0.1) 0%, transparent 25%),
          linear-gradient(to bottom, #111827, #1f2937)
        `,
        backgroundSize: '200% 200%'
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

      {/* Combat symbols floating in background */}
      <motion.div
        className="absolute top-1/4 left-1/4 text-4xl text-red-500/20 font-bold select-none pointer-events-none"
        animate={{
          y: [0, -30, 0],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        COMBAT
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/4 text-4xl text-red-500/20 font-bold select-none pointer-events-none"
        animate={{
          y: [0, 30, 0],
          rotate: [5, -5, 5],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        ARENA
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-1/3 text-4xl text-red-500/20 font-bold select-none pointer-events-none"
        animate={{
          y: [0, 20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        VICTORY
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative w-96 p-8 bg-gray-900/90 backdrop-blur-sm rounded-sm shadow-xl border-2 border-gray-700 z-10"
      >
        <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-red-600"></div>
        <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-red-600"></div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-red-600"></div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-red-600"></div>

        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold mb-6 text-center text-red-500 font-military tracking-wide uppercase"
          style={{ textShadow: '0 0 8px rgba(239, 68, 68, 0.7)' }}
        >
          Return To Battle
        </motion.h2>

        {message && (
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center mb-4 font-bold ${
              isError ? "text-red-500" : "text-red-400"
            }`}
          >
            {message}
          </motion.p>
        )}

        <motion.form
          variants={containerVariants}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <motion.div variants={itemVariants}>
            <input
              type="email"
              name="email"
              placeholder="WAR CORRESPONDENCE"
              className="w-full p-3 bg-gray-800 border-2 border-gray-700 rounded-none text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-0 uppercase font-bold tracking-wider"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <input
              type="password"
              name="password"
              placeholder="SECRET CODE"
              className="w-full p-3 bg-gray-800 border-2 border-gray-700 rounded-none text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-0 uppercase font-bold tracking-wider"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex items-center mt-2 text-gray-400 text-sm"
          >
            <label className="flex items-center cursor-pointer group">
              <input 
                type="checkbox" 
                className="sr-only"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <div className={`w-5 h-5 border-2 ${rememberMe ? 'bg-red-600/50 border-red-600' : 'bg-transparent border-gray-600'} mr-2 flex items-center justify-center transition-colors group-hover:border-red-500`}>
                {rememberMe && <span className="text-white text-xs">✓</span>}
              </div>
              <span className="uppercase tracking-wide text-xs group-hover:text-red-500 transition-colors">REMEMBER IDENTITY</span>
            </label>
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gray-800 text-white p-3 rounded-none border-2 border-red-600 hover:bg-red-600/20 font-bold uppercase tracking-wider transition-all duration-300 mt-4"
          >
            Enter Combat
          </motion.button>

          <motion.div
            variants={itemVariants}
            className="text-center mt-6 text-gray-400 font-bold"
          >
            Not yet registered?{" "}
            <Link 
              to="/register" 
              className="text-red-500 hover:text-red-400 transition-colors"
            >
              JOIN THE FIGHT
            </Link>
          </motion.div>
        </motion.form>

        <motion.div 
          variants={itemVariants}
          className="mt-6 text-center text-xs text-gray-500 font-mono"
        >
          <p>WELCOME BACK, WARRIOR.</p>
          <p>YOUR OPINIONS AWAIT THEIR TRIAL BY FIRE.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ArenaLogin;
