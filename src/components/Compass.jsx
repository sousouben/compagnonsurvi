
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass as CompassIcon, LocateFixed, Navigation } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Compass = () => {
  const [heading, setHeading] = useState(null);
  const [orientationSupported, setOrientationSupported] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(null); // null, 'granted', 'denied'

  const requestOrientationPermission = async () => {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permissionState = await DeviceOrientationEvent.requestPermission();
        if (permissionState === 'granted') {
          setPermissionGranted('granted');
          window.addEventListener('deviceorientation', handleOrientation);
        } else {
          setPermissionGranted('denied');
          toast({ title: "Permission Boussole Refusée", description: "La boussole ne peut pas fonctionner sans autorisation.", variant: "destructive" });
        }
      } catch (error) {
        console.error("Erreur de demande de permission:", error);
        setOrientationSupported(false); // Consider it unsupported if request fails
        toast({ title: "Erreur Permission", description: "Impossible de demander la permission pour la boussole.", variant: "destructive" });
      }
    } else {
      // For non-iOS 13+ browsers, or if API not available
      if ('ondeviceorientationabsolute' in window || 'ondeviceorientation' in window) {
         setPermissionGranted('granted'); // Assume granted if no requestPermission API
         window.addEventListener('deviceorientation', handleOrientation);
      } else {
        setOrientationSupported(false);
      }
    }
  };

  const handleOrientation = (event) => {
    let currentHeading;
    if (event.webkitCompassHeading) {
      // iOS
      currentHeading = event.webkitCompassHeading;
    } else if (event.absolute && event.alpha !== null) {
      // Android/Others with absolute orientation
      currentHeading = 360 - event.alpha; // alpha is 0 at North, increases clockwise
    } else if (event.alpha !== null){
      // Fallback if absolute is not available or not reliable
      // This might be relative to device initial position, not true north
      currentHeading = event.alpha; 
    }
    
    if (typeof currentHeading !== 'undefined') {
      setHeading(Math.round(currentHeading));
    }
  };

  useEffect(() => {
    // Attempt to use API on mount, if no requestPermission needed or already granted
    if (permissionGranted === 'granted' && orientationSupported) {
      window.addEventListener('deviceorientation', handleOrientation);
    }
    
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [permissionGranted, orientationSupported]);

  const getCardinalDirection = (h) => {
    if (h === null) return '';
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];
    const index = Math.round((h % 360) / 22.5);
    return directions[index % 16];
  };
  
  if (permissionGranted === null && typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    return (
      <div className="glass-effect rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-lg border border-border">
        <LocateFixed size={48} className="mb-4 text-survival-green dark:text-survival-green-light" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Activer la Boussole</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Pour utiliser la boussole, veuillez autoriser l'accès aux capteurs d'orientation de votre appareil.
        </p>
        <motion.button
          onClick={requestOrientationPermission}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-survival-green text-white dark:bg-survival-green-light dark:text-survival-green px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-opacity-90 dark:hover:bg-opacity-90"
        >
          Autoriser l'accès
        </motion.button>
      </div>
    );
  }

  if (!orientationSupported || permissionGranted === 'denied') {
    return (
      <div className="glass-effect rounded-lg p-6 text-center shadow-lg border border-border">
        <CompassIcon size={48} className="mb-4 text-survival-red dark:text-survival-red-light" />
        <p className="text-sm text-destructive">
          {permissionGranted === 'denied' 
            ? "Permission refusée. La boussole ne peut être affichée."
            : "Boussole non supportée sur cet appareil ou navigateur."}
        </p>
         <p className="text-xs text-muted-foreground mt-2">
          Assurez-vous que votre navigateur a accès aux capteurs de mouvement et d'orientation.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-xl p-6 flex flex-col items-center justify-center shadow-lg border border-border aspect-square max-w-xs mx-auto">
      <div className="relative w-48 h-48 sm:w-56 sm:h-56">
        {/* Rose des vents statique */}
        <img-replace src="/compass-base.svg" alt="Base de la boussole" className="w-full h-full opacity-80" />
        
        {/* Aiguille mobile */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
          animate={{ rotate: heading !== null ? -heading : 0 }} // Rotate needle opposite to device heading to point North
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <div className="relative w-full h-full">
            {/* Aiguille Nord (Rouge) */}
            <div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 h-1/2 w-2 bg-survival-red dark:bg-survival-red-light rounded-b-full"
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transformOrigin: 'bottom center', height: '45%' }}
            ></div>
            {/* Aiguille Sud (Grise/Blanche) */}
             <div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1/2 w-2 bg-muted-foreground dark:bg-gray-400 rounded-t-full"
               style={{ clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)', transformOrigin: 'top center', height: '45%' }}
            ></div>
          </div>
        </motion.div>
         {/* Centre fixe */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-foreground rounded-full border-2 border-background"></div>
      </div>
      <div className="mt-4 text-center">
        {heading !== null ? (
          <>
            <p className="text-2xl font-bold text-foreground">
              {heading}° 
              <span className="ml-2 text-xl text-survival-green dark:text-survival-green-light">{getCardinalDirection(heading)}</span>
            </p>
            <p className="text-xs text-muted-foreground">Cap Actuel</p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Calibration de la boussole...</p>
        )}
      </div>
       <Navigation size={20} className="mt-3 text-muted-foreground" />
    </div>
  );
};

export default Compass;

