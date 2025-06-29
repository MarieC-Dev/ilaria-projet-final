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
const { getAllRecipes, createRecipe, updateRecipe, deleteRecipe, getOneRecipe} = require("./routes/recipes");
const usersRoute = require("./routes/users");
const login = require("./routes/login");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

// Session store
const sessionStore = new MySQLStore({}, db);

app.use(cookieParser());
app.use(session({
  name: 'session_cookie',
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // chemin absolu vers le dossier uploads
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, '_');
    const uniqueSuffix = Date.now();
    cb(null, baseName + '-' + uniqueSuffix + ext);
  }
});

// Filtrage des fichiers (optionnel)
/*const fileFilter = (req, file, cb) => {
  // Accepte uniquement les fichiers images
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Seules les images sont autorisées !'), false);
  }
};*/

// Initialisation de multer
const uploadImg = multer({ storage: storage });

app.use('/users', usersRoute);

app.get('/recipes', getAllRecipes);
app.get('/recipes/:id', getOneRecipe);
app.post('/recipes', uploadImg.single('recipe-image'), createRecipe);
app.put('/recipes/:id', uploadImg.single('recipe-image'), updateRecipe);
app.delete('/recipes/:id', deleteRecipe);

app.use('/login', login);

sessionStore.onReady().then(() => {
  console.log('✅ MySQLStore ready');
}).catch(error => {
  console.error('❌ MySQLStore error', error);
});

app.listen(PORT, () => {
  console.log(`➡️  BACKEND on port ${PORT} ✅`);
});