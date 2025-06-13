import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Search, MapPin, Leaf, AlertTriangle, CheckCircle } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Fix for default markers in react-leaflet
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const PlantMap = () => {
  const [selectedRegion, setSelectedRegion] = useState("france");
  const [searchTerm, setSearchTerm] = useState("");
  const [userLocation, setUserLocation] = useState([46.603354, 1.888334]); // Centre de la France

  const regions = [
    { id: "france", name: "France", center: [46.603354, 1.888334] },
    //{ id: 'europe', name: 'Europe', center: [54.526, 15.2551] },
    //{ id: 'north-america', name: 'Amérique du Nord', center: [45.4215, -75.6972] },
  ];

  const ediblePlants = [
    {
      id: 1,
      name: "Plantain",
      scientificName: "Plantago major",
      region: "france",
      position: [48.8566, 2.3522],
      edible: true,
      medicinal: true,
      description:
        "Feuilles comestibles crues ou cuites. Propriétés anti-inflammatoires.",
      season: "Printemps à automne",
      identification: "Feuilles en rosette, nervures parallèles",
      preparation: "Jeunes feuilles en salade, plus âgées cuites",
      danger: "low",
    },
    {
      id: 2,
      name: "Pissenlit",
      scientificName: "Taraxacum officinale",
      region: "france",
      position: [45.764, 4.8357],
      edible: true,
      medicinal: true,
      description: "Toute la plante est comestible. Riche en vitamines.",
      season: "Toute l'année",
      identification: "Feuilles dentées, fleurs jaunes",
      preparation: "Feuilles en salade, racines en décoction",
      danger: "low",
    },
    {
      id: 3,
      name: "Ortie",
      scientificName: "Urtica dioica",
      region: "france",
      position: [43.6047, 1.4442],
      edible: true,
      medicinal: true,
      description: "Très nutritive une fois cuite. Riche en fer et protéines.",
      season: "Printemps à automne",
      identification: "Feuilles dentées, poils urticants",
      preparation: "Cuisson obligatoire, soupe ou tisane",
      danger: "medium",
    },
    {
      id: 4,
      name: "Trèfle",
      scientificName: "Trifolium pratense",
      region: "france",
      position: [47.2184, -1.5536],
      edible: true,
      medicinal: false,
      description: "Feuilles et fleurs comestibles. Goût légèrement sucré.",
      season: "Printemps à été",
      identification: "Feuilles à 3 folioles, fleurs roses/blanches",
      preparation: "Cru en salade ou cuit",
      danger: "low",
    },
    {
      id: 5,
      name: "Sureau noir",
      scientificName: "Sambucus nigra",
      region: "france",
      position: [49.4944, 0.1079],
      edible: true,
      medicinal: true,
      description: "Baies noires comestibles cuites. Fleurs en beignets.",
      season: "Été pour les baies",
      identification: "Arbuste, grappes de baies noires",
      preparation: "Baies cuites uniquement, fleurs crues",
      danger: "medium",
    },
    {
      id: 6,
      name: "Châtaigne",
      scientificName: "Castanea sativa",
      region: "france",
      position: [44.9778, 6.0649],
      edible: true,
      medicinal: false,
      description: "Fruits très nutritifs, riches en amidon.",
      season: "Automne",
      identification: "Bogues épineuses, fruits bruns brillants",
      preparation: "Grillées, bouillies ou moulues en farine",
      danger: "low",
    },
    {
      id: 7,
      name: "Mûre sauvage",
      scientificName: "Rubus fruticosus",
      region: "france",
      position: [46.0, 2.0],
      edible: true,
      medicinal: true,
      description:
        "Baies noires sucrées, excellentes crues ou en confiture. Feuilles en tisane.",
      season: "Fin d'été à automne",
      identification:
        "Ronces épineuses, feuilles dentées, fleurs blanches ou roses.",
      preparation: "Baies crues, cuites. Jeunes feuilles en infusion.",
      danger: "low",
    },
    {
      id: 8,
      name: "Noisette",
      scientificName: "Corylus avellana",
      region: "france",
      position: [47.5, 3.5],
      edible: true,
      medicinal: false,
      description:
        "Fruits à coque très nutritifs, riches en lipides et protéines.",
      season: "Automne",
      identification:
        "Arbuste, feuilles ovales dentées, fruits dans une cupule foliacée.",
      preparation: "Crues après avoir retiré la coque.",
      danger: "low",
    },
    {
      id: 9,
      name: "Fraise des bois",
      scientificName: "Fragaria vesca",
      region: "france",
      position: [45.0, 1.0],
      edible: true,
      medicinal: true,
      description:
        "Petites fraises très parfumées. Feuilles et racines médicinales.",
      season: "Printemps à été",
      identification:
        "Plante rampante, feuilles trifoliées dentées, fleurs blanches.",
      preparation: "Baies crues. Feuilles en infusion.",
      danger: "low",
    },
    {
      id: 10,
      name: "Ail des ours",
      scientificName: "Allium ursinum",
      region: "france",
      position: [46.8, 5.5],
      edible: true,
      medicinal: true,
      description: "Forte odeur d'ail. Toutes les parties sont comestibles.",
      season: "Printemps",
      identification:
        "Feuilles larges et lancéolées, fleurs blanches en ombelle. Attention à ne pas confondre avec le Muguet (toxique).",
      preparation: "Cru en salade, pesto, ou cuit.",
      danger: "medium",
    },
    {
      id: 11,
      name: "Menthe sauvage",
      scientificName: "Mentha arvensis",
      region: "france",
      position: [48.0, 1.5],
      edible: true,
      medicinal: true,
      description:
        "Feuilles très aromatiques, utilisées en infusion ou pour parfumer les plats.",
      season: "Printemps à automne",
      identification: "Feuilles ovales dentées, odeur mentholée, tiges carrées",
      preparation: "Infusion, crue, ciselée dans les plats",
      danger: "low",
    },
    {
      id: 12,
      name: "Lierre terrestre",
      scientificName: "Glechoma hederacea",
      region: "france",
      position: [47.0, 2.0],
      edible: true,
      medicinal: true,
      description:
        "Petite plante aromatique, utilisée en tisane ou comme condiment.",
      season: "Printemps",
      identification: "Feuilles rondes, fleurs violettes, rampante",
      preparation: "Infusion, séchée ou fraîche",
      danger: "low",
    },
    {
      id: 13,
      name: "Ficaire",
      scientificName: "Ficaria verna",
      region: "france",
      position: [48.6, 2.4],
      edible: true,
      medicinal: false,
      description:
        "Jeunes feuilles comestibles en toute petite quantité, riches en vitamine C.",
      season: "Fin d’hiver à printemps",
      identification: "Feuilles en cœur, fleurs jaunes brillantes",
      preparation: "Crue en salade (avant floraison uniquement)",
      danger: "medium",
    },
    {
      id: 14,
      name: "Amarante sauvage",
      scientificName: "Amaranthus retroflexus",
      region: "france",
      position: [44.0, 1.0],
      edible: true,
      medicinal: false,
      description:
        "Feuilles riches en nutriments. Graines comestibles également.",
      season: "Été à automne",
      identification: "Tiges rouges, feuilles larges, fleurs en épis",
      preparation: "Feuilles cuites comme des épinards, graines bouillies",
      danger: "low",
    },
    {
      id: 15,
      name: "Achillée millefeuille",
      scientificName: "Achillea millefolium",
      region: "france",
      position: [45.3, 4.8],
      edible: true,
      medicinal: true,
      description:
        "Feuilles jeunes comestibles. Plante médicinale utilisée en infusion.",
      season: "Printemps à été",
      identification: "Feuilles très découpées, fleurs blanches en ombelles",
      preparation: "Jeunes feuilles crues ou en tisane",
      danger: "low",
    },
  ];

  const poisonousPlants = [
    {
      id: 101,
      name: "Belladone",
      scientificName: "Atropa belladonna",
      region: "france",
      position: [45.1885, 5.7245],
      edible: false,
      description: "EXTRÊMEMENT TOXIQUE. Baies noires brillantes mortelles.",
      identification: "Baies noires, fleurs violettes en cloche",
      danger: "extreme",
    },
    {
      id: 102,
      name: "Ciguë",
      scientificName: "Conium maculatum",
      region: "france",
      position: [48.1173, -1.6778],
      edible: false,
      description: "MORTELLE. Ressemble au persil ou à la carotte sauvage.",
      identification: "Tiges tachetées de rouge, odeur de souris",
      danger: "extreme",
    },
    {
      id: 103,
      name: "Datura",
      scientificName: "Datura stramonium",
      region: "france",
      position: [43.6, 1.4],
      edible: false,
      description:
        "TOXIQUE. Peut provoquer hallucinations, troubles cardiaques, voire la mort.",
      identification:
        "Feuilles dentées, grandes fleurs blanches en trompette, fruits épineux",
      danger: "extreme",
    },
    {
      id: 104,
      name: "Aconit napel",
      scientificName: "Aconitum napellus",
      region: "france",
      position: [45.0, 6.0],
      edible: false,
      description:
        "Plante des montagnes TRÈS TOXIQUE. Neurotoxique et cardiotoxique.",
      identification:
        "Fleurs violettes en casque, feuilles palmées profondément découpées",
      danger: "extreme",
    },
    {
      id: 105,
      name: "If commun",
      scientificName: "Taxus baccata",
      region: "france",
      position: [47.0, 2.0],
      edible: false,
      description: "Toutes les parties (sauf l'arille rouge) sont MORTELLES.",
      identification:
        "Arbre à feuilles en aiguilles plates, baies rouges contenant une graine toxique",
      danger: "extreme",
    },
    {
      id: 106,
      name: "Colchique d'automne",
      scientificName: "Colchicum autumnale",
      region: "france",
      position: [46.5, 2.5],
      edible: false,
      description:
        "Ressemble au safran mais MORTEL en ingestion. Inhibe la division cellulaire.",
      identification:
        "Fleurs mauves sans tige visible à la floraison, feuilles apparaissant au printemps",
      danger: "extreme",
    },
    {
      id: 107,
      name: "Laurier-rose",
      scientificName: "Nerium oleander",
      region: "france",
      position: [43.3, 5.4],
      edible: false,
      description:
        "Très toxique. Quelques feuilles peuvent suffire à provoquer la mort.",
      identification:
        "Arbuste à fleurs roses, blanches ou rouges, feuilles longues et étroites",
      danger: "extreme",
    },
  ];

  const allPlants = [...ediblePlants, ...poisonousPlants];

  const filteredPlants = allPlants.filter(
    (plant) =>
      plant.region === selectedRegion &&
      plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.log("Géolocalisation non disponible");
        }
      );
    }
  }, []);

  const getDangerColor = (danger) => {
    switch (danger) {
      case "low":
        return "text-green-400";
      case "medium":
        return "text-yellow-400";
      case "extreme":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getDangerIcon = (danger) => {
    switch (danger) {
      case "low":
        return CheckCircle;
      case "medium":
        return AlertTriangle;
      case "extreme":
        return AlertTriangle;
      default:
        return Leaf;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 pt-8"
    >
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          Carte des Plantes
        </h1>
        <p className="text-gray-400">
          Plantes comestibles et dangereuses par région
        </p>
      </div>

      {/* Region Selector */}
      <div className="mb-4">
        <div className="flex gap-2 overflow-x-auto">
          {regions.map((region) => (
            <motion.button
              key={region.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedRegion(region.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedRegion === region.id
                  ? "bg-green-500 text-white"
                  : "glass-effect text-gray-300 hover:text-white"
              }`}
            >
              {region.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher une plante..."
            className="w-full bg-slate-800 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Map */}
      <div
        className="mb-6 glass-effect rounded-lg overflow-hidden"
        style={{ height: "300px" }}
      >
        <MapContainer
          center={
            regions.find((r) => r.id === selectedRegion)?.center || userLocation
          }
          zoom={6}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredPlants.map((plant) => (
            <Marker key={plant.id} position={plant.position}>
              <Popup>
                <div className="text-sm">
                  <h3 className="font-bold">{plant.name}</h3>
                  <p className="italic text-gray-600">{plant.scientificName}</p>
                  <p className="mt-1">{plant.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Plant List */}
      <div className="space-y-3">
        {filteredPlants.map((plant, index) => {
          const DangerIcon = getDangerIcon(plant.danger);

          return (
            <motion.div
              key={plant.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`glass-effect rounded-lg p-4 ${
                plant.edible
                  ? "border-l-4 border-green-500"
                  : "border-l-4 border-red-500"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-bold text-white">{plant.name}</h3>
                    <DangerIcon
                      className={getDangerColor(plant.danger)}
                      size={16}
                    />
                  </div>
                  <p className="text-gray-400 text-sm italic mb-2">
                    {plant.scientificName}
                  </p>
                  <p className="text-gray-300 text-sm mb-2">
                    {plant.description}
                  </p>

                  {plant.edible && (
                    <div className="space-y-1 text-sm">
                      {plant.season && (
                        <p>
                          <span className="text-green-400">Saison:</span>{" "}
                          {plant.season}
                        </p>
                      )}
                      {plant.identification && (
                        <p>
                          <span className="text-blue-400">Identification:</span>{" "}
                          {plant.identification}
                        </p>
                      )}
                      {plant.preparation && (
                        <p>
                          <span className="text-yellow-400">Préparation:</span>{" "}
                          {plant.preparation}
                        </p>
                      )}
                    </div>
                  )}

                  {!plant.edible && plant.identification && (
                    <p className="text-sm">
                      <span className="text-red-400">Identification:</span>{" "}
                      {plant.identification}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-center space-y-1 ml-4">
                  {plant.edible && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                      Comestible
                    </span>
                  )}
                  {!plant.edible && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Toxique
                    </span>
                  )}
                  {plant.medicinal && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      Médicinal
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredPlants.length === 0 && (
        <div className="text-center py-8">
          <Leaf className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-400">
            Aucune plante trouvée pour cette recherche
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default PlantMap;
