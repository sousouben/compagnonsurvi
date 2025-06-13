import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Flashlight,
  Volume2,
  Eye,
  Radio,
  Flag,
  Sun,
  AlertCircle,
} from "lucide-react";

const signalTechniquesData = [
  {
    title: "Signal lumineux SOS",
    description:
      "Utilisez une lampe torche, un miroir de signalisation ou l'écran de votre téléphone.",
    pattern: "Morse: ••• ——— ••• (3 courts, 3 longs, 3 courts)",
    icon: Flashlight,
  },
  {
    title: "Signal sonore SOS",
    description:
      "Utilisez un sifflet, un klaxon, des cris ou tapez sur un objet métallique.",
    pattern: "Morse: ••• ——— ••• (3 courts, 3 longs, 3 courts)",
    icon: Volume2,
  },
  {
    title: "Signal visuel au sol",
    description:
      'Créez un grand "X" ou "SOS" visible du ciel avec des branches, pierres, vêtements de couleur vive.',
    pattern: "Grandes lettres (min. 3m de haut), contraste avec le sol",
    icon: Eye,
  },
  {
    title: "Signal de fumée",
    description:
      "Faites un feu et ajoutez des matériaux verts/humides pour une fumée épaisse et visible.",
    pattern: "3 colonnes de fumée espacées si possible",
    icon: Radio,
  },
  {
    title: "Signal au drapeau ou tissu",
    description:
      "Agitez un tissu de couleur vive ou un vêtement au-dessus de la tête ou en formant des mouvements réguliers.",
    pattern: 'Mouvements circulaires lents ou en forme de "X"',
    icon: Flag,
  },
  {
    title: "Signal avec miroir de signalisation",
    description:
      "Utilisez un miroir ou une surface réfléchissante pour diriger un faisceau lumineux vers un avion ou un hélicoptère.",
    pattern: "Coupures lumineuses régulières vers le point d’observation",
    icon: Sun,
  },
  {
    title: "Signal de détresse international (3 de tout)",
    description:
      "Effectuez un signal en série de 3 (3 feux, 3 coups de sifflet, 3 flashs, etc.)",
    pattern: "3 répétitions espacées régulièrement",
    icon: AlertCircle,
  },
];

const SignalTechniques = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
        <Smartphone
          className="mr-3 text-survival-green dark:text-survival-green-light"
          size={24}
        />
        Techniques de Signalisation
      </h2>
      <div className="space-y-4">
        {signalTechniquesData.map((technique, index) => {
          const Icon = technique.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              className="glass-effect rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-border"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-survival-green to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Icon className="text-white dark:text-background" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-md text-foreground mb-1">
                    {technique.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    {technique.description}
                  </p>
                  <p className="text-survival-green dark:text-survival-green-light text-xs font-medium bg-survival-green/10 dark:bg-survival-green-light/10 px-2 py-1 rounded-md inline-block">
                    {technique.pattern}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SignalTechniques;
