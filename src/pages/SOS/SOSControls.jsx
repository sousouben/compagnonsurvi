import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Flashlight, Volume2, VolumeX } from "lucide-react";

const SOSControls = ({
  sosActive,
  isFlashing,
  isSoundActive,
  startSOSFlash,
  startSOSSound,
  stopSOS,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mb-6">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button
            onClick={startSOSFlash}
            disabled={sosActive && isFlashing}
            className="w-full h-24 bg-survival-red dark:bg-survival-red-light text-white dark:text-survival-red font-bold text-lg shadow-lg rounded-xl flex flex-col items-center justify-center hover:bg-opacity-90 dark:hover:bg-opacity-90"
          >
            <Flashlight className="mb-1" size={28} />
            Signal Lumineux
            <span className="text-xs opacity-80 mt-0.5">Flash SOS Visuel</span>
          </Button>
        </motion.div>

        {/* Signal Sonore Button Removed 
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button
            onClick={startSOSSound}
            disabled={sosActive && isSoundActive}
            className="w-full h-24 bg-orange-500 dark:bg-orange-400 text-white dark:text-orange-900 font-bold text-lg shadow-lg rounded-xl flex flex-col items-center justify-center hover:bg-opacity-90 dark:hover:bg-opacity-90"
          >
            {isSoundActive ? <VolumeX className="mb-1" size={28} /> : <Volume2 className="mb-1" size={28} />}
            Signal Sonore
            <span className="text-xs opacity-80 mt-0.5">Fonctionnalité Désactivée</span>
          </Button>
        </motion.div>
        */}
      </div>

      {sosActive && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Button
            onClick={stopSOS}
            className="w-full h-20 bg-slate-600 dark:bg-slate-500 text-white dark:text-slate-900 font-bold text-xl shadow-lg rounded-xl flex items-center justify-center hover:bg-opacity-90 dark:hover:bg-opacity-90"
          >
            <VolumeX className="mr-3" size={28} /> ARRÊTER LE SIGNAL
          </Button>
        </motion.div>
      )}
    </>
  );
};

export default SOSControls;
