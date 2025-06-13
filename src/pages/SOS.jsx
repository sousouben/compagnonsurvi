import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import SOSControls from './SOS/SOSControls';
import LocationInfo from './SOS/LocationInfo';
import EmergencyNumbers from './SOS/EmergencyNumbers';
import SignalTechniques from './SOS/SignalTechniques';
import { useTheme } from '@/contexts/ThemeContext';


const SOS = () => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [isSoundActive, setIsSoundActive] = useState(false);
  const [location, setLocation] = useState(null);
  const [sosActive, setSOSActive] = useState(false);
  

  const sosActiveRef = useRef(sosActive);
  const isSoundActiveRef = useRef(isSoundActive);
  const { isDarkMode } = useTheme();


  useEffect(() => {
    sosActiveRef.current = sosActive;
  }, [sosActive]);

  useEffect(() => {
    isSoundActiveRef.current = isSoundActive;
  }, [isSoundActive]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          toast({
            title: "Géolocalisation indisponible",
            description: "Impossible d'obtenir votre position. Vérifiez les autorisations.",
            variant: "destructive"
          });
        }
      );
    }
    return () => {
      
      document.body.classList.remove('sos-flash-active');
    };
  }, []);


  const startSOSFlash = () => {
    if (sosActiveRef.current && isFlashing) return;
    
    setSOSActive(true);
    setIsFlashing(true);
    document.body.classList.add('sos-flash-active');
    
    toast({
      title: "Signal Lumineux SOS Activé",
      description: "L'écran clignote en SOS. Appuyez sur ARRÊTER pour stopper.",
    });
  };
  
  const startSOSSound = null; // Feature removed as per user request


  const copyLocation = () => {
    if (location) {
      const locationText = `Latitude: ${Number(location.latitude).toFixed(6)}, Longitude: ${Number(location.longitude).toFixed(6)}`;
      navigator.clipboard.writeText(locationText)
        .then(() => toast({ title: "Position copiée", description: "Coordonnées GPS copiées." }))
        .catch(() => toast({ title: "Erreur", description: "Impossible de copier.", variant: "destructive" }));
    }
  };

  const openMaps = () => {
    if (location) {
      const lat = Number(location.latitude);
      const lon = Number(location.longitude);
      if (!isNaN(lat) && !isNaN(lon)) {
        const url = `https://www.google.com/maps?q=${lat.toFixed(6)},${lon.toFixed(6)}`;
        window.open(url, '_blank');
      } else {
        toast({ title: "Erreur de localisation", description: "Coordonnées invalides.", variant: "destructive"});
      }
    }
  };

  const stopSOS = () => {
    document.body.classList.remove('sos-flash-active');
    
    


    setIsFlashing(false);
    setIsSoundActive(false); // This state is no longer used for sound, but keep for consistency if flash uses it
    setSOSActive(false); 
    
    toast({
      title: "Signaux SOS Arrêtés",
      description: "Les signaux d'urgence ont été désactivés.",
    });
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-0 md:p-4`}
    >
      <div className="text-center mb-8">
        <motion.div
          animate={{ scale: sosActive ? [1, 1.05, 1] : 1 }}
          transition={{ repeat: sosActive ? Infinity : 0, duration: 1.2, ease: "easeInOut" }}
        >
          <AlertTriangle className="mx-auto mb-3 text-survival-red dark:text-survival-red-light" size={72} strokeWidth={1.5} />
        </motion.div>
        <h1 className="text-3xl font-extrabold text-survival-red dark:text-survival-red-light mb-2 tracking-tight">MODE URGENCE SOS</h1>
        <p className="text-muted-foreground text-lg">Signaux de détresse et informations vitales</p>
      </div>

      <SOSControls 
        sosActive={sosActive}
        isFlashing={isFlashing}
        isSoundActive={isSoundActive}
        startSOSFlash={startSOSFlash}
        startSOSSound={startSOSSound}
        stopSOS={stopSOS}
      />

      <LocationInfo location={location} copyLocation={copyLocation} openMaps={openMaps} />
      <EmergencyNumbers />
      <SignalTechniques />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 glass-effect rounded-xl p-5 border-l-4 border-yellow-500 dark:border-yellow-400 shadow-lg"
      >
        <div className="flex items-start space-x-4">
          <AlertTriangle className="text-yellow-500 dark:text-yellow-400 flex-shrink-0 mt-0.5" size={28} />
          <div>
            <h3 className="font-semibold text-lg text-yellow-600 dark:text-yellow-400 mb-1">Avertissement Important</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              En situation d'urgence réelle, contactez IMMÉDIATEMENT les services de secours professionnels via les numéros fournis.
              Cette application est un outil d'assistance et ne remplace EN AUCUN CAS les secours organisés.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SOS;