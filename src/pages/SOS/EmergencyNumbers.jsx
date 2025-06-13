import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

const emergencyNumbersData = [
  { country: 'France', number: '112', service: 'Urgences EU' },
  { country: 'France', number: '15', service: 'SAMU (Médical)' },
  { country: 'France', number: '17', service: 'Police Secours' },
  { country: 'France', number: '18', service: 'Pompiers' },
  { country: 'International', number: '112', service: 'Global Urgences' },
  { country: 'USA/Canada', number: '911', service: 'Urgences Nord Am.' },
];

const EmergencyNumbers = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
        <Phone className="mr-3 text-survival-red dark:text-survival-red-light" size={24} />
        Numéros d'urgence Vitaux
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {emergencyNumbersData.map((emergency, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.2 }}
            className="glass-effect rounded-xl p-3.5 text-center shadow-md hover:shadow-lg transition-shadow border border-border"
          >
            <a 
              href={`tel:${emergency.number}`}
              className="flex flex-col items-center justify-center h-full group"
            >
              <div className="font-bold text-xl text-foreground mb-1 group-hover:text-survival-green dark:group-hover:text-survival-green-light transition-colors">{emergency.number}</div>
              <div className="text-xs text-muted-foreground mb-1.5 leading-tight">{emergency.service}</div>
              <div className="text-xs text-survival-green dark:text-survival-green-light group-hover:underline font-medium">{emergency.country} - Appeler</div>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyNumbers;