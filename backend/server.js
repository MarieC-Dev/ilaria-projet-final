const express = require('express');
const app = express();
const cors = require('cors');
const multer  = require('multer');
const path = require('path');
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const cookieParser = require("cookie-parser");
require("dotenv").config();

const PORT = 3000;
const db = require('./middlewares/db_connection.js');
const { getAllRecipes } = require("./routes/recipes");
const { createRecipe } = require("./routes/recipes");
const { getAllUsers } = require("./routes/users");
const { createUser } = require("./routes/users");

// Session store
const sessionStore = new MySQLStore({}, db);

app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: "lax",
  },
}));

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

app.use(express.urlencoded({ extended: true }));
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
app.post('/recipes', uploadImg.single('create-recipe-picture'), createRecipe);

app.get('/users', getAllUsers);
app.post('/users', uploadImg.single('signup-add-picture'), createUser);

sessionStore.onReady().then(() => {
  console.log('✅ MySQLStore ready');
}).catch(error => {
  console.error('❌ MySQLStore error', error);
});

app.listen(PORT, () => {
  console.log(`➡️  BACKEND on port ${PORT} ✅`);
});