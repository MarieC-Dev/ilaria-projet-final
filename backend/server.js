const express = require('express');
const app = express();
const cors = require('cors');
const multer  = require('multer');
const path = require('path');

const PORT = 3000;
const db = require('./middlewares/db_connection.js');
const { getAllRecipes } = require("./routes/recipes");
const { createRecipe } = require("./routes/recipes");
const { getAllUsers } = require("./routes/users");
const { createUser } = require("./routes/users");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
//app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // dossier de destination
  },
  filename: function (req, file, cb) {
    // Renomme le fichier pour éviter les doublons
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Filtrage des fichiers (optionnel)
const fileFilter = (req, file, cb) => {
  // Accepte uniquement les fichiers images
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Seules les images sont autorisées !'), false);
  }
};

// Initialisation de multer
const uploadImg = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limite à 5MB
});

app.get('/recipes', getAllRecipes);
app.post('/recipes', createRecipe);

app.get('/users', getAllUsers);
app.post('/create-user', uploadImg.single('signup-add-picture'), createUser);

app.listen(PORT, () => {
  console.log(`➡️  BACKEND on port ${PORT} ✅`);
});