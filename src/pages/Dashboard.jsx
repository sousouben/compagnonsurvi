import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Package,
  BookOpen,
  Map,
  Brain,
  AlertTriangle,
  Battery,
  Moon,
  Sun,
  Zap,
  Cloud,
  Compass as CompassIconLucide,
  // ListChecks as PreparationIcon removed
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import WeatherWidget from "@/components/WeatherWidget";
// import Compass from '@/components/Compass'; // Boussole retirée

const Dashboard = () => {
  const { isDarkMode, isEnergySaveMode, toggleDarkMode, toggleEnergySaveMode } =
    useTheme();
  const [batteryLevel, setBatteryLevel] = React.useState(null);
  const [isCharging, setIsCharging] = React.useState(false);

  React.useEffect(() => {
    if ("getBattery" in navigator) {
      navigator.getBattery().then((battery) => {
        setBatteryLevel(Math.round(battery.level * 100));
        setIsCharging(battery.charging);

        battery.addEventListener("levelchange", () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
        battery.addEventListener("chargingchange", () => {
          setIsCharging(battery.charging);
        });
      });
    } else {
      setBatteryLevel(85); // Fallback si l'API n'est pas dispo
    }
  }, []);

  const quickActions = [
    {
      title: "Kit de Survie",
      description: "Vérifiez votre équipement",
      icon: Package,
      path: "/kit",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Techniques",
      description: "Guides de survie",
      icon: BookOpen,
      path: "/techniques",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Carte Plantes",
      description: "Plantes comestibles",
      icon: Map,
      path: "/map",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Quiz Survie",
      description: "Testez vos connaissances",
      icon: Brain,
      path: "/quiz",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const OPENWEATHERMAP_API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 pt-8"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-foreground mb-2"
        >
          Survivor Companion
        </motion.h1>
        <p className="text-muted-foreground">Votre guide de survie ultime</p>
      </div>

      {/* Emergency SOS Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Link to="/sos">
          <Button className="w-full h-16 bg-survival-red dark:bg-survival-red-light text-white dark:text-survival-red font-bold text-lg hover:bg-opacity-90 dark:hover:bg-opacity-90">
            <AlertTriangle className="mr-2" size={24} />
            URGENCE SOS
          </Button>
        </Link>
      </motion.div>

      {/* Quick Settings */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass-effect rounded-lg p-4 text-center"
        >
          <Battery
            className={`mx-auto mb-2 ${
              isCharging
                ? "text-survival-green dark:text-survival-green-light"
                : "text-muted-foreground"
            }`}
            size={24}
          />
          <p className="text-xs text-muted-foreground">Batterie</p>
          <p className="text-sm font-bold text-foreground">
            {batteryLevel !== null ? `${batteryLevel}%` : "N/A"}
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleDarkMode}
          className="glass-effect rounded-lg p-4 text-center"
        >
          {isDarkMode ? (
            <Moon className="mx-auto mb-2 text-blue-400" size={24} />
          ) : (
            <Sun className="mx-auto mb-2 text-yellow-400" size={24} />
          )}
          <p className="text-xs text-muted-foreground">Mode</p>
          <p className="text-sm font-bold text-foreground">
            {isDarkMode ? "Nuit" : "Jour"}
          </p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleEnergySaveMode}
          className="glass-effect rounded-lg p-4 text-center"
        >
          <Zap
            className={`mx-auto mb-2 ${
              isEnergySaveMode ? "text-orange-400" : "text-muted-foreground"
            }`}
            size={24}
          />
          <p className="text-xs text-muted-foreground">Économie</p>
          <p className="text-sm font-bold text-foreground">
            {isEnergySaveMode ? "ON" : "OFF"}
          </p>
        </motion.button>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to={action.path}>
                <div className="glass-effect rounded-xl p-6 h-36 flex flex-col justify-between hover:bg-card/80 dark:hover:bg-card/70 transition-all">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 shadow-md`}
                  >
                    <Icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm mb-1">
                      {action.title}
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Dashboard;
