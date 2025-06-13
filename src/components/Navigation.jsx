import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Package, 
  BookOpen, 
  Map, 
  Brain, 
  AlertTriangle
  // ListChecks removed
} from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Accueil' },
    { path: '/kit', icon: Package, label: 'Kit' },
    { path: '/techniques', icon: BookOpen, label: 'Techniques' },
    { path: '/map', icon: Map, label: 'Carte' },
    { path: '/quiz', icon: Brain, label: 'Quiz' },
    { path: '/sos', icon: AlertTriangle, label: 'SOS' },
  ];
  // Removed Preparation from navItems
  // { path: '/preparation', icon: ListChecks, label: 'Prép.' }, 

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 dark:bg-background/80 backdrop-blur-lg border-t border-border">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center p-2 min-w-0"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-survival-green text-white' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                <Icon size={20} />
              </motion.div>
              <span className={`text-xs mt-1 ${
                isActive ? 'text-survival-green dark:text-survival-green-light' : 'text-muted-foreground'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-survival-green dark:bg-survival-green-light rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;