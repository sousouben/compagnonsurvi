import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Navigation from '@/components/Navigation';
import Dashboard from '@/pages/Dashboard';
import SurvivalKit from '@/pages/SurvivalKit';
import Techniques from '@/pages/Techniques';
import PlantMap from '@/pages/PlantMap';
import Quiz from '@/pages/Quiz';
import SOS from '@/pages/SOS';
// import PreparationPage from '@/pages/Preparation'; // Removed
import { ThemeProvider } from '@/contexts/ThemeContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-green-500 border-t-transparent"
          />
          <h1 className="text-2xl font-bold text-white mb-2">Survivor Companion</h1>
          <p className="text-gray-400">Chargement de votre guide de survie...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen">
          <Navigation />
          <main className="pb-20 pt-4 md:pt-8 px-2 md:px-4 max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/kit" element={<SurvivalKit />} />
                <Route path="/techniques" element={<Techniques />} />
                <Route path="/map" element={<PlantMap />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/sos" element={<SOS />} />
                {/* <Route path="/preparation" element={<PreparationPage />} /> User requested removal of this page earlier, ensuring it's commented out or removed */}
              </Routes>
            </AnimatePresence>
          </main>
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;