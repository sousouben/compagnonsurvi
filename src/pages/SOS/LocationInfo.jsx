import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

const LocationInfo = ({ location, copyLocation, openMaps }) => {
  if (!location) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-effect rounded-xl p-5 mb-6 shadow-lg border border-border"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <MapPin className="text-survival-green dark:text-survival-green-light mr-3" size={24} />
          <h3 className="font-semibold text-lg text-foreground">Position GPS Actuelle</h3>
        </div>
        <span className="text-xs text-muted-foreground">±{location.accuracy ? Math.round(location.accuracy) : 'N/A'}m</span>
      </div>
      
      <div className="space-y-1.5 text-sm mb-4">
        <p className="text-muted-foreground">
          <span className="font-medium text-foreground">Latitude:</span> {Number(location.latitude).toFixed(6)}
        </p>
        <p className="text-muted-foreground">
          <span className="font-medium text-foreground">Longitude:</span> {Number(location.longitude).toFixed(6)}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button onClick={copyLocation} variant="outline" size="sm" className="flex-1 text-xs font-medium border-border hover:bg-accent/10 dark:hover:bg-accent/20">
          Copier Coordonnées
        </Button>
        <Button onClick={openMaps} variant="outline" size="sm" className="flex-1 text-xs font-medium border-border hover:bg-accent/10 dark:hover:bg-accent/20">
          Ouvrir dans Maps
        </Button>
      </div>
    </motion.div>
  );
};

export default LocationInfo;