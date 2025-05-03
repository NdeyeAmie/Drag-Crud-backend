import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv"
import Card from './models/cardModels.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB Atlas
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connecté'))
  .catch((err) => {
    console.error(' Erreur de connexion  :', err.message);
    process.exit(1); 
  });

// Routes
app.get('/cards', async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des cartes' });
  }
});


// Post
app.post('/cards', async (req, res) => {
  try {
    const card = new Card(req.body);
    await card.save();
    res.status(201).json(card);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors ajout de la carte' });
  }
});

// Delete
app.delete('/cards/:id', async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.json({ message: 'Carte supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression' });
  }
});

//Updete
app.put('/cards/:id', async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedCard);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la carte' });
  }
}); 


// demarrer le Port
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
