import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, X, Package, Edit, Trash2, Zap, Thermometer, Droplet, Flame as Fire, Home as HomeIcon, Apple, Compass, AlarmPlus as FirstAid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input"; 

const SurvivalKit = () => {
  const [kitItems, setKitItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('general'); // Default category for new items
  const [editingItem, setEditingItem] = useState(null); // For editing existing items, not used in current setup but kept for future
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddItemForm, setShowAddItemForm] = useState(false);

  const initialSurvivalKitItems = [
    // ÉQUIPEMENT GÉNÉRAL
    { id: 'equip-1', name: "Sac à dos robuste", category: "general", essential: true, owned: false },
    { id: 'equip-2', name: "Tente ou bâche", category: "general", essential: true, owned: false },
    { id: 'equip-3', name: "Sac de couchage / couverture de survie", category: "general", essential: true, owned: false },
    { id: 'equip-4', name: "Corde / paracorde", category: "general", essential: false, owned: false },
    { id: 'equip-5', name: "Lampe frontale + piles de rechange", category: "general", essential: true, owned: false },
    // FEU & ÉNERGIE
    { id: 'fire-1', name: "Briquet / allumettes étanches", category: "fire", essential: true, owned: false },
    { id: 'fire-2', name: "Pierre à feu (ferrocérium)", category: "fire", essential: true, owned: false },
    { id: 'fire-3', name: "Allume-feu naturel (coton vaseliné, écorce…)", category: "fire", essential: false, owned: false },
    { id: 'fire-4', name: "Réchaud portable (optionnel)", category: "fire", essential: false, owned: false },
    // EAU
    { id: 'water-1', name: "Gourde / bouteille résistante", category: "water", essential: true, owned: false },
    { id: 'water-2', name: "Système de filtration (Sawyer Mini, LifeStraw…)", category: "water", essential: true, owned: false },
    { id: 'water-3', name: "Pastilles de purification", category: "water", essential: true, owned: false },
    { id: 'water-4', name: "Contenant repliable ou réserve d’eau", category: "water", essential: false, owned: false },
    // NOURRITURE
    { id: 'food-1', name: "Rations de survie / lyophilisées", category: "food", essential: true, owned: false },
    { id: 'food-2', name: "Couteau multifonction", category: "tools", essential: true, owned: false }, // Moved to tools for relevance
    { id: 'food-3', name: "Réchaud ou boîte pour chauffer", category: "food", essential: false, owned: false }, // Also relates to fire
    { id: 'food-4', name: "Ustensiles compacts", category: "food", essential: false, owned: false },
    { id: 'food-5', name: "Aliments énergétiques (noix, barres, etc.)", category: "food", essential: true, owned: false },
    // SANTÉ & SECOURS
    { id: 'health-1', name: "Trousse de premiers soins", category: "medical", essential: true, owned: false },
    { id: 'health-2', name: "Médicaments personnels", category: "medical", essential: true, owned: false },
    { id: 'health-3', name: "Couverture thermique", category: "general", essential: true, owned: false }, // Moved to general
    { id: 'health-4', name: "Désinfectant", category: "medical", essential: true, owned: false },
    { id: 'health-5', name: "Gants, ciseaux, pansements", category: "medical", essential: false, owned: false },
    // ORIENTATION & COMMUNICATION
    { id: 'nav-1', name: "Carte papier de la région", category: "navigation", essential: true, owned: false },
    { id: 'nav-2', name: "Boussole", category: "navigation", essential: true, owned: false },
    { id: 'nav-3', name: "Téléphone avec batterie externe", category: "navigation", essential: true, owned: false }, // Also energy
    { id: 'nav-4', name: "Radio manuelle / solaire", category: "navigation", essential: false, owned: false },
    { id: 'nav-5', name: "Sifflet de signalisation", category: "navigation", essential: true, owned: false },
    // VÊTEMENTS
    { id: 'cloth-1', name: "Vêtements adaptés au climat", category: "clothing", essential: true, owned: false },
    { id: 'cloth-2', name: "Sous-couches thermiques", category: "clothing", essential: true, owned: false },
    { id: 'cloth-3', name: "Poncho ou veste imperméable", category: "clothing", essential: true, owned: false },
    { id: 'cloth-4', name: "Gants et bonnet", category: "clothing", essential: false, owned: false },
    { id: 'cloth-5', name: "Chaussures solides", category: "clothing", essential: true, owned: false },
    // ADMINISTRATION / EXTRA
    { id: 'admin-1', name: "Carte d’identité / permis", category: "admin", essential: true, owned: false },
    { id: 'admin-2', name: "Argent liquide", category: "admin", essential: false, owned: false },
    { id: 'admin-3', name: "Carnet étanche + crayon", category: "admin", essential: false, owned: false },
    { id: 'admin-4', name: "Lampe UV ou briquet plasma", category: "tools", essential: false, owned: false }, // Also fire/tools
    { id: 'admin-5', name: "Fiche de contacts d'urgence", category: "admin", essential: true, owned: false },
    // Custom category for user-added items
    { id: 'custom-item-example', name: "Mon objet perso", category: "custom", essential: false, owned: false, custom: true },
  ];


  const categories = [
    { id: 'all', name: 'Tout', icon: Package, color: 'text-gray-500 dark:text-gray-400' },
    { id: 'general', name: 'Général', icon: HomeIcon, color: 'text-green-500 dark:text-green-400' },
    { id: 'fire', name: 'Feu & Énergie', icon: Fire, color: 'text-orange-500 dark:text-orange-400' },
    { id: 'water', name: 'Eau', icon: Droplet, color: 'text-blue-500 dark:text-blue-400' },
    { id: 'food', name: 'Nourriture', icon: Apple, color: 'text-red-500 dark:text-red-400' },
    { id: 'medical', name: 'Santé & Secours', icon: FirstAid, color: 'text-pink-500 dark:text-pink-400' },
    { id: 'navigation', name: 'Orientation & Comm.', icon: Compass, color: 'text-purple-500 dark:text-purple-400' },
    { id: 'clothing', name: 'Vêtements', icon: '👕', color: 'text-teal-500 dark:text-teal-400' }, // Using emoji for clothing
    { id: 'tools', name: 'Outils', icon: Zap, color: 'text-yellow-500 dark:text-yellow-400' },
    { id: 'admin', name: 'Administration', icon: '💼', color: 'text-slate-500 dark:text-slate-400' }, // Using emoji for admin
    { id: 'custom', name: 'Perso', icon: Package, color: 'text-indigo-500 dark:text-indigo-400' },
  ];

  useEffect(() => {
    const savedKit = localStorage.getItem('survivor-kit');
    if (savedKit) {
      setKitItems(JSON.parse(savedKit));
    } else {
      setKitItems(initialSurvivalKitItems); // Use the new detailed list
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('survivor-kit', JSON.stringify(kitItems));
  }, [kitItems]);

  const toggleItemOwned = (id) => {
    setKitItems(items => 
      items.map(item => 
        item.id === id ? { ...item, owned: !item.owned } : item
      )
    );
    toast({
      title: "Kit mis à jour",
      description: "Votre progression a été sauvegardée",
    });
  };

  const addCustomItem = () => {
    if (!newItemName.trim()) return;
    
    const customItem = {
      id: Date.now(),
      name: newItemName,
      category: newItemCategory || 'custom',
      essential: false,
      owned: false,
      custom: true
    };
    
    setKitItems(items => [...items, customItem]);
    setNewItemName('');
    setNewItemCategory('general'); // Reset to a default category
    setShowAddItemForm(false); // Hide form after adding
    toast({
      title: "Objet ajouté",
      description: `"${newItemName}" a été ajouté à votre kit personnalisé.`,
    });
  };

  const removeCustomItem = (id) => {
    setKitItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Objet supprimé",
      description: "L'objet a été retiré de votre kit",
    });
  };

  const filteredItems = selectedCategory === 'all' 
    ? kitItems 
    : kitItems.filter(item => item.category === selectedCategory);

  const completionRate = Math.round((kitItems.filter(item => item.owned).length / kitItems.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-0 md:p-4" 
    >
      {/* Header */}
      <div className="text-center mb-8">
        <Package className="mx-auto mb-3 text-survival-green dark:text-survival-green-light" size={48} strokeWidth={1.5}/>
        <h1 className="text-3xl font-extrabold text-foreground mb-2 tracking-tight">Kit de Survie Interactif</h1>
        <p className="text-muted-foreground text-lg">Constituez et gérez votre équipement essentiel.</p>
        {/* Progression bar removed as per user request */}
      </div>

      {/* Add Item Button */}
      <div className="mb-6 text-center">
        <Button 
          onClick={() => setShowAddItemForm(!showAddItemForm)}
          className="bg-survival-brown text-white dark:bg-survival-brown-light dark:text-survival-brown hover:bg-opacity-90 dark:hover:bg-opacity-90"
        >
          <Plus size={18} className="mr-2" /> {showAddItemForm ? "Masquer le formulaire" : "Ajouter un objet personnalisé"}
        </Button>
      </div>

      {/* Add Custom Item Form */}
      {showAddItemForm && (
        <motion.div 
          layout
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 p-5 glass-effect rounded-xl shadow-lg border border-border overflow-hidden"
        >
          <h2 className="text-xl font-semibold text-foreground mb-4">Nouvel objet personnalisé</h2>
          <div className="space-y-4">
            <Input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Nom de l'objet"
              className="bg-background/70 dark:bg-background/70 border-border placeholder:text-muted-foreground"
            />
            <select 
              value={newItemCategory} 
              onChange={(e) => setNewItemCategory(e.target.value)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {categories.filter(cat => cat.id !== 'all').map(cat => (
                 <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <Button onClick={addCustomItem} className="w-full bg-survival-green text-white dark:bg-survival-green-light dark:text-survival-green hover:bg-opacity-90 dark:hover:bg-opacity-90">
              <Check size={18} className="mr-2" /> Ajouter au kit
            </Button>
          </div>
        </motion.div>
      )}


      {/* Category Filter */}
      <div className="mb-8">
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {categories.map((category) => {
            const CategoryIcon = category.icon;
            const iconIsString = typeof CategoryIcon === 'string';
            return (
            <motion.button
              key={category.id}
              whileHover={{ y: -3, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl aspect-square transition-all duration-150 shadow-md
                ${ selectedCategory === category.id ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white ring-2 ring-offset-2 ring-offset-background dark:ring-offset-slate-900 ring-emerald-500' 
                : 'glass-effect text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50 border border-slate-200 dark:border-slate-700'}`}
            >
              {iconIsString ? <span className="text-2xl mb-1">{CategoryIcon}</span> : <CategoryIcon size={28} className={`mb-1.5 ${category.color} ${selectedCategory === category.id ? 'text-white' : ''}`} />}
              <span className="text-xs font-semibold tracking-tight">{category.name}</span>
            </motion.button>
          );
        })}
        </div>
      </div>
      
      {/* Add/Edit Custom Item - This part was removed as per previous instructions, re-adding for consistency if needed or can be kept removed */}
      {/* For now, I'll assume the previous removal was intentional and not re-add the complex add/edit form from SurvivalKit.jsx to keep this diff focused on styling and the user's current request. If it needs to be re-added, it would be similar to the previous SurvivalKit.jsx structure. */}


      {/* Kit Items */}
      <div className="space-y-3">
        {filteredItems.map((item, index) => {
          const itemCategoryData = categories.find(c => c.id === item.category);
          const ItemIcon = itemCategoryData ? itemCategoryData.icon : Package;
          const iconIsString = typeof ItemIcon === 'string';
          const itemIconColor = itemCategoryData ? itemCategoryData.color : 'text-gray-400';

          return (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration:0.2, delay: index * 0.03 }}
            className={`rounded-xl p-4 shadow-md transition-all duration-200 ease-in-out ${item.owned ? 'bg-green-500/10 dark:bg-green-600/20 border-l-4 border-emerald-500 dark:border-emerald-400' : 'glass-effect border-l-4 border-slate-300 dark:border-slate-600'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleItemOwned(item.id)}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150 ease-in-out
                    ${ item.owned
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-emerald-600 text-white shadow-lg'
                      : `border-slate-300 dark:border-gray-600 hover:border-emerald-400 dark:hover:border-emerald-500 ${iconIsString ? '' : itemIconColor}`
                  }`}
                >
                  {item.owned ? <Check size={20} strokeWidth={3}/> : (iconIsString ? <span className="text-xl">{ItemIcon}</span> : <ItemIcon size={20} />)}
                </motion.button>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold truncate text-base ${item.owned ? 'text-emerald-700 dark:text-emerald-300 line-through decoration-emerald-500 decoration-2' : 'text-slate-800 dark:text-white'}`}>
                    {item.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    {item.essential && (
                      <span className="text-xs bg-red-500/80 text-white px-2.5 py-0.5 rounded-full font-semibold tracking-wide shadow-sm">
                        Essentiel
                      </span>
                    )}
                    <span className={`text-xs capitalize font-medium ${iconIsString ? 'text-slate-500 dark:text-slate-400' : itemIconColor}`}>
                      {itemCategoryData?.name || 'Personnalisé'}
                    </span>
                  </div>
                </div>
              </div>
              
              {item.custom && (
                <div className="flex items-center space-x-1.5 ml-2">
                   {/* Edit button can be re-added here if needed */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-500/70 dark:text-red-400/70 hover:text-red-600 dark:hover:text-red-500 p-1.5 rounded-md hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl shadow-xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg font-semibold">Supprimer l'objet ?</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                          Êtes-vous sûr de vouloir supprimer "{item.name}" de votre kit ? Cette action est irréversible.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel className="border-slate-400 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700">Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={() => removeCustomItem(item.id)} className="bg-red-600 hover:bg-red-700 text-white">Supprimer</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto mb-4 text-gray-400 dark:text-gray-500" size={56} strokeWidth={1.5} />
          <p className="text-gray-500 dark:text-gray-400 text-lg">Aucun objet dans cette catégorie pour le moment.</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">Essayez de sélectionner une autre catégorie ou d'ajouter vos propres objets.</p>
        </div>
      )}
    </motion.div>
  );
};

export default SurvivalKit;