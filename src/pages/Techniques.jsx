import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Droplets,
  Flame,
  Home as HomeIcon,
  Apple,
  Compass as CompassIcon,
  Shield,
  Image as ImageIcon,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Techniques = () => {
  const [expandedTechnique, setExpandedTechnique] = useState(null);
  const { isDarkMode } = useTheme();

  const techniques = [
    {
      id: "water",
      title: "Purification de l'eau",
      icon: Droplets,
      color: "from-blue-500 to-blue-600",
      techniques: [
        {
          name: "Ébullition",
          description:
            "Faire bouillir l'eau pendant 3-5 minutes pour éliminer les bactéries et virus.",
          steps: [
            "Collecter l'eau dans un récipient",
            "Allumer un feu et placer le récipient dessus",
            "Faire bouillir pendant 3-5 minutes",
            "Laisser refroidir avant de boire",
          ],
        },
        {
          name: "Filtration naturelle",
          description: "Utiliser des matériaux naturels pour filtrer l'eau.",
          steps: [
            "Prendre une bouteille en plastique",
            "Percer des trous dans le bouchon",
            "Ajouter des couches : sable fin, charbon, gravier",
            "Verser l'eau lentement par le haut",
          ],
        },
        {
          name: "Collecte de rosée",
          description: "Récupérer l'eau de la rosée matinale.",
          steps: [
            "Utiliser un tissu propre tôt le matin",
            "Essuyer la rosée sur l'herbe et les feuilles",
            "Essorer le tissu dans un récipient",
            "Répéter l'opération",
          ],
        },
        {
          name: "Pastilles purificatrices",
          description:
            "Utiliser des comprimés de purification à base de chlore ou d’iode.",
          steps: [
            "Remplir une gourde avec de l'eau claire",
            "Ajouter une pastille purificatrice selon les instructions",
            "Fermer et secouer légèrement",
            "Attendre le temps recommandé (généralement 30 minutes)",
            "Boire l'eau traitée",
          ],
        },
        {
          name: "Distillation solaire",
          description:
            "Utiliser la chaleur du soleil pour évaporer et condenser l'eau.",
          steps: [
            "Creuser un trou dans un sol ensoleillé",
            "Placer un récipient au centre du trou",
            "Recouvrir avec un plastique transparent, scellé sur les bords avec des pierres",
            "Mettre un petit caillou au centre du plastique (au-dessus du récipient)",
            "L'eau s'évapore et se condense pour tomber dans le récipient",
          ],
        },
      ],
    },
    {
      id: "fire",
      title: "Allumer un feu",
      icon: Flame,
      color: "from-orange-500 to-red-600",
      techniques: [
        {
          name: "Méthode du friction",
          description: "Créer du feu par friction avec des bâtons.",
          steps: [
            "Trouver du bois sec (cèdre, saule)",
            "Créer une encoche en V dans une planche",
            "Frotter rapidement un bâton dans l'encoche",
            "Souffler doucement sur les braises",
          ],
        },
        {
          name: "Silex et acier",
          description: "Utiliser des étincelles pour allumer un feu.",
          steps: [
            "Préparer de l'amadou (écorce de bouleau)",
            "Frapper le silex avec l'acier",
            "Diriger les étincelles vers l'amadou",
            "Souffler pour développer la flamme",
          ],
        },
        {
          name: "Lentille solaire",
          description: "Concentrer les rayons du soleil.",
          steps: [
            "Utiliser une loupe ou des lunettes",
            "Concentrer le rayon sur de l'amadou",
            "Maintenir le point focal fixe",
            "Souffler quand la fumée apparaît",
          ],
        },
      ],
    },
    {
      id: "shelter",
      title: "Construction d'abri",
      icon: HomeIcon,
      color: "from-green-500 to-green-600",
      techniques: [
        {
          name: "Abri en A",
          description: "Construction d'un abri triangulaire simple.",
          steps: [
            "Trouver une branche longue et solide",
            "L'appuyer contre un arbre ou rocher",
            "Placer des branches plus petites de chaque côté",
            "Recouvrir de feuilles et débris",
          ],
        },
        {
          name: "Abri de débris",
          description: "Utiliser les matériaux naturels disponibles.",
          steps: [
            "Créer un cadre avec des branches",
            "Empiler des feuilles mortes",
            "Ajouter de l'écorce pour l'étanchéité",
            "Créer une couche isolante au sol",
          ],
        },
      ],
    },
    {
      id: "food",
      title: "Trouver de la nourriture",
      icon: Apple,
      color: "from-emerald-500 to-emerald-600",
      techniques: [
        {
          name: "Plantes comestibles",
          description: "Identifier les plantes sûres à consommer.",
          steps: [
            "Apprendre les plantes locales comestibles",
            "Éviter les champignons inconnus",
            "Tester en petite quantité d'abord",
            "Chercher des baies connues (mûres, myrtilles)",
          ],
        },
        {
          name: "Pêche de survie",
          description: "Techniques de pêche improvisées.",
          steps: [
            "Fabriquer un hameçon avec une épingle",
            "Utiliser des vers comme appât",
            "Créer une ligne avec du fil ou ficelle",
            "Pêcher dans les zones calmes",
          ],
        },
        {
          name: "Pièges à petits animaux",
          description: "Construire des pièges simples.",
          steps: [
            "Identifier les pistes d'animaux",
            "Construire un piège à collet",
            "Utiliser des appâts naturels",
            "Vérifier régulièrement les pièges",
          ],
        },
        {
          name: "Insectes comestibles",
          description: "Manger des insectes riches en protéines.",
          steps: [
            "Chercher des criquets, vers, fourmis",
            "Éviter les insectes brillants ou à odeur forte",
            "Les cuire si possible pour tuer les parasites",
            "Mâcher lentement pour tester la tolérance",
          ],
        },
        {
          name: "Fruits à coque",
          description: "Ramasser des noix, châtaignes ou noisettes.",
          steps: [
            "Identifier les arbres à fruits à coque comestibles",
            "Ramasser les fruits tombés au sol",
            "Retirer les coques dures",
            "Les griller ou les consommer crus si sûrs",
          ],
        },
      ],
    },
    {
      id: "navigation",
      title: "Navigation sans boussole",
      icon: CompassIcon,
      color: "from-purple-500 to-purple-600",
      techniques: [
        {
          name: "Navigation par les étoiles",
          description: "Utiliser les constellations pour s'orienter.",
          steps: [
            "Localiser l'étoile polaire (Nord)",
            "Utiliser la Grande Ourse comme guide",
            "Observer la position des étoiles",
            "Se déplacer en gardant un cap constant",
          ],
        },
        {
          name: "Navigation par le soleil",
          description: "Utiliser la position du soleil.",
          steps: [
            "Le soleil se lève à l'Est",
            "À midi, il est au Sud (hémisphère Nord)",
            "Il se couche à l'Ouest",
            "Utiliser l'ombre d'un bâton",
          ],
        },
        {
          name: "Signes naturels",
          description: "Lire les indices de la nature.",
          steps: [
            "La mousse pousse côté Nord des arbres",
            "Les fourmilières s'ouvrent au Sud",
            "Observer la direction du vent dominant",
            "Suivre les cours d'eau vers la civilisation",
          ],
        },
      ],
    },
    {
      id: "safety",
      title: "Premiers secours",
      icon: Shield,
      color: "from-red-500 to-red-600",
      techniques: [
        {
          name: "Traitement des blessures",
          description: "Soigner les coupures et blessures.",
          steps: [
            "Nettoyer la plaie avec de l'eau propre",
            "Appliquer une pression pour arrêter le saignement",
            "Utiliser des plantes antiseptiques (plantain)",
            "Bander avec du tissu propre",
          ],
        },
        {
          name: "Hypothermie",
          description: "Prévenir et traiter l'hypothermie.",
          steps: [
            "Rester au sec et au chaud",
            "Créer un abri isolé",
            "Partager la chaleur corporelle",
            "Boire des liquides chauds",
          ],
        },
        {
          name: "Coup de chaleur / Insolation",
          description: "Reconnaître et traiter un coup de chaleur.",
          steps: [
            "Se mettre à l’ombre immédiatement",
            "Boire de l’eau fraîche en petites gorgées",
            "Appliquer des compresses fraîches sur la peau",
            "Repos complet et éviter tout effort",
          ],
        },
        {
          name: "Morsures ou piqûres",
          description:
            "Premiers soins pour morsures et piqûres d'insectes ou animaux.",
          steps: [
            "Nettoyer la zone avec de l’eau et du savon",
            "Éviter de sucer ou percer la plaie",
            "Appliquer une compresse froide pour réduire le gonflement",
            "Surveiller les signes d’allergie ou infection",
            "Consulter un médecin rapidement si nécessaire",
          ],
        },
        {
          name: "Signaux d'urgence / SOS",
          description:
            "Techniques pour signaler sa présence et demander de l’aide.",
          steps: [
            "Utiliser un sifflet ou crier par intervalles",
            "Faire un feu visible ou des fumées colorées",
            "Créer des signaux au sol avec des pierres ou branches (triangle ou SOS)",
            "Utiliser un miroir pour refléter la lumière du soleil",
          ],
        },
        {
          name: "Hygiène et prévention des infections",
          description: "Maintenir une bonne hygiène pour éviter les maladies.",
          steps: [
            "Laver régulièrement les mains avec de l’eau propre ou un gel désinfectant",
            "Éviter de toucher les plaies avec les mains sales",
            "Utiliser des vêtements propres et protéger les zones blessées",
            "Boire de l’eau purifiée pour éviter les maladies digestives",
          ],
        },
      ],
    },
  ];

  const toggleTechnique = (id) => {
    setExpandedTechnique(expandedTechnique === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-0 md:p-4"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-foreground mb-2 tracking-tight">
          Techniques de Survie
        </h1>
        <p className="text-muted-foreground text-lg">
          Guides pratiques pour toutes les situations
        </p>
      </div>

      <div className="space-y-4">
        {techniques.map((category, index) => {
          const Icon = category.icon;
          const isExpanded = expandedTechnique === category.id;

          return (
            <motion.div
              key={category.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="glass-effect rounded-xl overflow-hidden shadow-lg border border-border"
            >
              <motion.button
                onClick={() => toggleTechnique(category.id)}
                className="w-full p-5 flex items-center justify-between hover:bg-accent/10 dark:hover:bg-accent/20 transition-colors duration-150"
                whileHover={{ scale: 1.0 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center shadow-md`}
                  >
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground text-left">
                    {category.title}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="text-muted-foreground" size={24} />
                </motion.div>
              </motion.button>

              <motion.div
                initial={false}
                animate={{
                  height: isExpanded ? "auto" : 0,
                  opacity: isExpanded ? 1 : 0,
                  paddingTop: isExpanded ? "1rem" : "0rem",
                  paddingBottom: isExpanded ? "1rem" : "0rem",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden px-5"
              >
                <div className="space-y-5">
                  {category.techniques.map((technique, techIndex) => (
                    <motion.div
                      key={techIndex}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: techIndex * 0.05, duration: 0.2 }}
                      className="bg-background/50 dark:bg-background/30 rounded-lg p-4 shadow-sm border border-border/50"
                    >
                      <h4 className="font-semibold text-md text-survival-green dark:text-survival-green-light mb-2">
                        {technique.name}
                      </h4>
                      <p className="text-muted-foreground text-sm mb-3">
                        {technique.description}
                      </p>

                      {technique.image && (
                        <div className="my-3 rounded-md overflow-hidden">
                          <img-replace
                            src={technique.image}
                            alt={technique.name}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <h5 className="font-medium text-survival-green dark:text-survival-green-light text-sm">
                          Étapes :
                        </h5>
                        <ol className="space-y-1.5 list-decimal list-inside">
                          {technique.steps.map((step, stepIndex) => (
                            <li
                              key={stepIndex}
                              className="text-muted-foreground text-sm flex items-start"
                            >
                              <span className="text-survival-green dark:text-survival-green-light mr-2 font-semibold">
                                {stepIndex + 1}.
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Techniques;
