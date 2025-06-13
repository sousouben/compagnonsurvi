import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind, Thermometer, Umbrella, Eye, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const METAWEATHER_PROXY_URL = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [locationWoeid, setLocationWoeid] = useState(null);
  const [locationName, setLocationName] = useState('Localisation...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWoeid = (lat, lon) => {
      setLoading(true);
      fetch(`${METAWEATHER_PROXY_URL}/search/?lattlong=${lat},${lon}`)
        .then(response => {
          if (!response.ok) throw new Error(`Erreur recherche WOEID: ${response.status}`);
          return response.json();
        })
        .then(data => {
          if (data && data.length > 0) {
            setLocationWoeid(data[0].woeid);
            setLocationName(data[0].title);
          } else {
            throw new Error("Aucune localisation trouvée pour ces coordonnées.");
          }
        })
        .catch(err => {
          console.error("Erreur fetch WOEID:", err);
          setError(`Impossible de trouver la localisation: ${err.message}`);
          toast({ title: "Erreur Localisation Météo", description: err.message, variant: "destructive" });
          // Fallback à Paris si la recherche par lat/lon échoue
          setLocationWoeid(615702); 
          setLocationName("Paris (par défaut)");
        });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWoeid(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.warn(`Erreur Géolocalisation (${err.code}): ${err.message}`);
          setError("Géolocalisation échouée. Affichage météo pour Paris.");
          toast({ title: "Géolocalisation Échouée", description: "Affichage de la météo pour Paris par défaut. Autorisez la localisation pour une météo précise.", variant: "destructive" });
          setLocationWoeid(615702); // Fallback to Paris WOEID
          setLocationName("Paris (par défaut)");
        }
      );
    } else {
      setError("Géolocalisation non supportée. Affichage météo pour Paris.");
      toast({ title: "Géolocalisation Non Supportée", description: "Affichage de la météo pour Paris par défaut.", variant: "destructive" });
      setLocationWoeid(615702); // Fallback to Paris WOEID
      setLocationName("Paris (par défaut)");
    }
  }, []);

  useEffect(() => {
    if (locationWoeid) {
      setLoading(true);
      setError(null);
      fetch(`${METAWEATHER_PROXY_URL}/${locationWoeid}/`)
        .then(response => {
          if (!response.ok) throw new Error(`Erreur API MetaWeather: ${response.status}`);
          return response.json();
        })
        .then(data => {
          setWeatherData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Erreur fetch météo MetaWeather:", err);
          setError(`Impossible de charger la météo: ${err.message}`);
          setLoading(false);
          toast({ title: "Erreur Météo", description: `Impossible de charger les données météo: ${err.message}. L'API MetaWeather peut être temporairement instable.`, variant: "destructive" });
        });
    }
  }, [locationWoeid]);

  const getWeatherIcon = (weatherStateAbbr) => {
    switch (weatherStateAbbr) {
      case 'sn': return <CloudSnow size={48} className="text-sky-300" />; // Snow
      case 'sl': return <CloudRain size={48} className="text-blue-300" />; // Sleet
      case 'h': return <CloudHail size={48} className="text-blue-400" />;  // Hail (Using CloudRain as proxy)
      case 't': return <CloudLightning size={48} className="text-yellow-500" />; // Thunderstorm
      case 'hr': return <CloudRain size={48} className="text-blue-500" />; // Heavy Rain
      case 'lr': return <CloudRain size={48} className="text-blue-400" />; // Light Rain
      case 's': return <CloudRain size={48} className="text-blue-300" />; // Showers
      case 'hc': return <Cloud size={48} className="text-gray-500" />;    // Heavy Cloud
      case 'lc': return <Cloud size={48} className="text-gray-400" />;    // Light Cloud
      case 'c': return <Sun size={48} className="text-yellow-400" />;     // Clear
      default: return <Cloud size={48} className="text-foreground" />;
    }
  };

  if (loading && !weatherData) { // Show loading only if no data yet
    return (
      <div className="glass-effect rounded-lg p-4 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 mx-auto mb-2 rounded-full border-2 border-survival-green border-t-transparent"
        />
        <p className="text-sm text-muted-foreground">Chargement météo pour {locationName}...</p>
      </div>
    );
  }

  if (error && !weatherData) { // Show error only if no data yet
    return (
      <div className="glass-effect rounded-lg p-4 text-center">
        <AlertTriangle size={32} className="mx-auto mb-2 text-survival-red" />
        <p className="text-sm text-destructive">{error}</p>
        <p className="text-xs text-muted-foreground mt-1">L'API MetaWeather peut être instable. Réessayez plus tard.</p>
      </div>
    );
  }

  if (!weatherData || !weatherData.consolidated_weather || weatherData.consolidated_weather.length === 0) {
    return (
      <div className="glass-effect rounded-lg p-4 text-center">
        <Cloud size={32} className="mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Données météo indisponibles pour {locationName}.</p>
         {error && <p className="text-xs text-destructive mt-1">{error}</p>}
      </div>
    );
  }
  
  const todayWeather = weatherData.consolidated_weather[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-8 glass-effect rounded-lg p-5 shadow-lg border border-border"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-foreground text-lg">{weatherData.title || 'Météo Locale'}</h3>
          <p className="text-muted-foreground text-sm capitalize">
            {todayWeather.weather_state_name || 'Conditions actuelles'}
          </p>
        </div>
        <div className="text-right">
          {getWeatherIcon(todayWeather.weather_state_abbr)}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 text-sm">
        <div className="flex items-center">
          <Thermometer size={18} className="mr-2 text-survival-green dark:text-survival-green-light" />
          <span className="text-foreground font-medium">{Math.round(todayWeather.the_temp)}°C</span>
          <span className="text-muted-foreground ml-1">(min {Math.round(todayWeather.min_temp)}°C / max {Math.round(todayWeather.max_temp)}°C)</span>
        </div>
        <div className="flex items-center">
          <Wind size={18} className="mr-2 text-blue-400" />
          <span className="text-foreground font-medium">{Math.round(todayWeather.wind_speed * 1.60934)} km/h ({todayWeather.wind_direction_compass})</span>
        </div>
         <div className="flex items-center">
          <Umbrella size={18} className="mr-2 text-sky-400" />
          <span className="text-foreground font-medium">{todayWeather.humidity}% humidité</span>
        </div>
        <div className="flex items-center">
          <Eye size={18} className="mr-2 text-purple-400" />
          <span className="text-foreground font-medium">{Math.round(todayWeather.visibility * 1.60934)} km vis.</span>
        </div>
         <div className="flex items-center col-span-2 sm:col-span-1">
          <Sun size={18} className="mr-2 text-orange-400" />
          <span className="text-muted-foreground">
            Lever: {new Date(weatherData.sun_rise).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} / 
            Coucher: {new Date(weatherData.sun_set).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3 text-right">Météo fournie par MetaWeather</p>
       <p className="text-xs text-muted-foreground mt-1 text-right">Utilise un proxy pour MetaWeather API (peut être lent/instable)</p>
    </motion.div>
  );
};

// Helper for Hail, MetaWeather doesn't have a direct one like OpenWeatherMap
const CloudHail = (props) => <CloudRain {...props} />; // Using CloudRain as a placeholder

export default WeatherWidget;