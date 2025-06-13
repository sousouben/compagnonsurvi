import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Square, Plus, Trash2, ListChecks, Edit3, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

const PreparationPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('preparation-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Initial default tasks based on user input
      setTasks([
        // ÉQUIPEMENT GÉNÉRAL
        { id: 'equip-1', name: "Sac à dos robuste", completed: false, category: "🏕️ ÉQUIPEMENT GÉNÉRAL" },
        { id: 'equip-2', name: "Tente ou bâche", completed: false, category: "🏕️ ÉQUIPEMENT GÉNÉRAL" },
        { id: 'equip-3', name: "Sac de couchage / couverture de survie", completed: false, category: "🏕️ ÉQUIPEMENT GÉNÉRAL" },
        { id: 'equip-4', name: "Corde / paracorde", completed: false, category: "🏕️ ÉQUIPEMENT GÉNÉRAL" },
        { id: 'equip-5', name: "Lampe frontale + piles de rechange", completed: false, category: "🏕️ ÉQUIPEMENT GÉNÉRAL" },
        // FEU & ÉNERGIE
        { id: 'fire-1', name: "Briquet / allumettes étanches", completed: false, category: "🔥 FEU & ÉNERGIE" },
        { id: 'fire-2', name: "Pierre à feu (ferrocérium)", completed: false, category: "🔥 FEU & ÉNERGIE" },
        { id: 'fire-3', name: "Allume-feu naturel (coton vaseliné, écorce…)", completed: false, category: "🔥 FEU & ÉNERGIE" },
        { id: 'fire-4', name: "Réchaud portable (optionnel)", completed: false, category: "🔥 FEU & ÉNERGIE" },
        // EAU
        { id: 'water-1', name: "Gourde / bouteille résistante", completed: false, category: "💧 EAU" },
        { id: 'water-2', name: "Système de filtration (Sawyer Mini, LifeStraw…)", completed: false, category: "💧 EAU" },
        { id: 'water-3', name: "Pastilles de purification", completed: false, category: "💧 EAU" },
        { id: 'water-4', name: "Contenant repliable ou réserve d’eau", completed: false, category: "💧 EAU" },
        // NOURRITURE
        { id: 'food-1', name: "Rations de survie / lyophilisées", completed: false, category: "🍴 NOURRITURE" },
        { id: 'food-2', name: "Couteau multifonction", completed: false, category: "🍴 NOURRITURE" },
        { id: 'food-3', name: "Réchaud ou boîte pour chauffer", completed: false, category: "🍴 NOURRITURE" },
        { id: 'food-4', name: "Ustensiles compacts", completed: false, category: "🍴 NOURRITURE" },
        { id: 'food-5', name: "Aliments énergétiques (noix, barres, etc.)", completed: false, category: "🍴 NOURRITURE" },
        // SANTÉ & SECOURS
        { id: 'health-1', name: "Trousse de premiers soins", completed: false, category: "🩹 SANTÉ & SECOURS" },
        { id: 'health-2', name: "Médicaments personnels", completed: false, category: "🩹 SANTÉ & SECOURS" },
        { id: 'health-3', name: "Couverture thermique", completed: false, category: "🩹 SANTÉ & SECOURS" },
        { id: 'health-4', name: "Désinfectant", completed: false, category: "🩹 SANTÉ & SECOURS" },
        { id: 'health-5', name: "Gants, ciseaux, pansements", completed: false, category: "🩹 SANTÉ & SECOURS" },
        // ORIENTATION & COMMUNICATION
        { id: 'nav-1', name: "Carte papier de la région", completed: false, category: "🧭 ORIENTATION & COMMUNICATION" },
        { id: 'nav-2', name: "Boussole", completed: false, category: "🧭 ORIENTATION & COMMUNICATION" },
        { id: 'nav-3', name: "Téléphone avec batterie externe", completed: false, category: "🧭 ORIENTATION & COMMUNICATION" },
        { id: 'nav-4', name: "Radio manuelle / solaire", completed: false, category: "🧭 ORIENTATION & COMMUNICATION" },
        { id: 'nav-5', name: "Sifflet de signalisation", completed: false, category: "🧭 ORIENTATION & COMMUNICATION" },
        // VÊTEMENTS
        { id: 'cloth-1', name: "Vêtements adaptés au climat", completed: false, category: "🧣 VÊTEMENTS" },
        { id: 'cloth-2', name: "Sous-couches thermiques", completed: false, category: "🧣 VÊTEMENTS" },
        { id: 'cloth-3', name: "Poncho ou veste imperméable", completed: false, category: "🧣 VÊTEMENTS" },
        { id: 'cloth-4', name: "Gants et bonnet", completed: false, category: "🧣 VÊTEMENTS" },
        { id: 'cloth-5', name: "Chaussures solides", completed: false, category: "🧣 VÊTEMENTS" },
        // ADMINISTRATION / EXTRA
        { id: 'admin-1', name: "Carte d’identité / permis", completed: false, category: "📋 ADMINISTRATION / EXTRA" },
        { id: 'admin-2', name: "Argent liquide", completed: false, category: "📋 ADMINISTRATION / EXTRA" },
        { id: 'admin-3', name: "Carnet étanche + crayon", completed: false, category: "📋 ADMINISTRATION / EXTRA" },
        { id: 'admin-4', name: "Lampe UV ou briquet plasma", completed: false, category: "📋 ADMINISTRATION / EXTRA" },
        { id: 'admin-5', name: "Fiche de contacts d'urgence", completed: false, category: "📋 ADMINISTRATION / EXTRA" },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('preparation-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTaskName.trim() === '') {
      toast({ title: "Nom de tâche vide", description: "Veuillez entrer un nom pour la tâche.", variant: "destructive" });
      return;
    }
    const newTask = {
      id: Date.now(),
      name: newTaskName.trim(),
      completed: false,
      category: "PERSO" // Default category for new custom tasks
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    setNewTaskName('');
    toast({ title: "Tâche ajoutée", description: `"${newTask.name}" a été ajouté à votre liste.` });
  };

  const handleToggleTask = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    const taskToDelete = tasks.find(task => task.id === id);
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    toast({ title: "Tâche supprimée", description: `"${taskToDelete.name}" a été supprimée.` });
  };

  const handleStartEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskName(task.name);
  };

  const handleSaveEdit = () => {
    if (editingTaskName.trim() === '') {
      toast({ title: "Nom de tâche vide", description: "Le nom ne peut pas être vide.", variant: "destructive" });
      return;
    }
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === editingTaskId ? { ...task, name: editingTaskName.trim() } : task
      )
    );
    toast({ title: "Tâche modifiée", description: "La tâche a été mise à jour." });
    setEditingTaskId(null);
    setEditingTaskName('');
  };
  
  const completionPercentage = tasks.length > 0 ? Math.round((tasks.filter(task => task.completed).length / tasks.length) * 100) : 0;

  const groupedTasks = tasks.reduce((acc, task) => {
    const category = task.category || "PERSO";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(task);
    return acc;
  }, {});

  const categoryOrder = [
    "🏕️ ÉQUIPEMENT GÉNÉRAL",
    "🔥 FEU & ÉNERGIE",
    "💧 EAU",
    "🍴 NOURRITURE",
    "🩹 SANTÉ & SECOURS",
    "🧭 ORIENTATION & COMMUNICATION",
    "🧣 VÊTEMENTS",
    "📋 ADMINISTRATION / EXTRA",
    "PERSO" 
  ];


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-0 md:p-4"
    >
      <div className="text-center mb-8">
        <ListChecks className="mx-auto mb-3 text-survival-green dark:text-survival-green-light" size={48} strokeWidth={1.5}/>
        <h1 className="text-3xl font-extrabold text-foreground mb-2 tracking-tight">Checklist de Préparation</h1>
        <p className="text-muted-foreground text-lg">Organisez vos préparatifs avant chaque aventure.</p>
      </div>

      <div className="mb-6 glass-effect rounded-xl p-5 shadow-lg border border-border">
        <div className="flex justify-between items-center mb-2">
          <span className="text-foreground text-sm font-medium">Progression de la préparation</span>
          <span className="text-survival-green dark:text-survival-green-light font-bold text-lg">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-card dark:bg-background rounded-full h-3 border border-border">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            className="bg-gradient-to-r from-survival-green to-emerald-500 h-full rounded-full shadow-md"
            transition={{ duration: 0.5, ease: "circOut" }}
          />
        </div>
      </div>


      <motion.div 
        layout 
        className="mb-6 p-5 glass-effect rounded-xl shadow-lg border border-border"
      >
        <h2 className="text-xl font-semibold text-foreground mb-4">Ajouter une nouvelle tâche</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Ex: Vérifier la trousse de premiers secours"
            className="flex-grow bg-background/70 dark:bg-background/70 border-border placeholder:text-muted-foreground"
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <Button onClick={handleAddTask} className="bg-survival-brown text-white dark:bg-survival-brown-light dark:text-survival-brown hover:bg-opacity-90 dark:hover:bg-opacity-90">
            <Plus size={18} className="mr-2" /> Ajouter
          </Button>
        </div>
      </motion.div>

      <div className="space-y-6">
        {tasks.length === 0 && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground py-8"
          >
            Aucune tâche pour le moment. Commencez par en ajouter une !
          </motion.p>
        )}
        {categoryOrder.map(categoryName => {
          const categoryTasks = groupedTasks[categoryName];
          if (!categoryTasks || categoryTasks.length === 0) return null;

          return (
            <motion.div key={categoryName} layout className="glass-effect rounded-xl p-5 shadow-lg border border-border">
              <h3 className="text-lg font-semibold text-survival-green dark:text-survival-green-light mb-3 border-b border-border pb-2">
                {categoryName}
              </h3>
              <div className="space-y-3">
              {categoryTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                  transition={{ delay: index * 0.03, type: 'spring', stiffness: 260, damping: 30 }}
                  className={`rounded-lg p-3 transition-all duration-200 ease-in-out
                    ${task.completed 
                      ? 'bg-survival-green/10 dark:bg-survival-green-light/10 border-l-4 border-survival-green dark:border-survival-green-light' 
                      : 'bg-card/50 dark:bg-background/30 border-l-4 border-border hover:bg-accent/5 dark:hover:bg-accent/10'}`}
                >
                  {editingTaskId === task.id ? (
                    <div className="flex items-center gap-2">
                      <Input 
                        type="text"
                        value={editingTaskName}
                        onChange={(e) => setEditingTaskName(e.target.value)}
                        className="flex-grow bg-background/70 dark:bg-background/70 border-border h-9 text-sm"
                        onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                      />
                      <Button onClick={handleSaveEdit} size="icon" variant="ghost" className="text-survival-green dark:text-survival-green-light hover:bg-accent/20 h-9 w-9">
                        <Save size={18}/>
                      </Button>
                       <Button onClick={() => setEditingTaskId(null)} size="icon" variant="ghost" className="text-muted-foreground hover:bg-accent/20 h-9 w-9">
                        <X size={18}/>
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center flex-grow cursor-pointer min-w-0" onClick={() => handleToggleTask(task.id)}>
                        {task.completed ? (
                          <CheckSquare size={20} className="mr-2.5 text-survival-green dark:text-survival-green-light flex-shrink-0" />
                        ) : (
                          <Square size={20} className="mr-2.5 text-muted-foreground flex-shrink-0" />
                        )}
                        <span className={`flex-grow truncate text-sm ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                          {task.name}
                        </span>
                      </div>
                      <div className="flex items-center flex-shrink-0">
                        <Button onClick={() => handleStartEdit(task)} size="icon" variant="ghost" className="text-blue-500 dark:text-blue-400 hover:bg-accent/20 h-8 w-8">
                          <Edit3 size={16} />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                             <Button size="icon" variant="ghost" className="text-survival-red dark:text-survival-red-light hover:bg-accent/20 h-8 w-8">
                              <Trash2 size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-background border-border text-foreground rounded-xl shadow-xl">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-lg font-semibold">Supprimer la tâche ?</AlertDialogTitle>
                              <AlertDialogDescription className="text-muted-foreground">
                                Êtes-vous sûr de vouloir supprimer la tâche "{task.name}" ? Cette action est irréversible.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="mt-4">
                              <AlertDialogCancel className="border-border hover:bg-accent/50">Annuler</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteTask(task.id)} className="bg-survival-red hover:bg-opacity-90 text-white dark:bg-survival-red-light dark:text-survival-red dark:hover:bg-opacity-90">Supprimer</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PreparationPage;