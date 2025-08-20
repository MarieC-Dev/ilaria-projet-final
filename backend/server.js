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
const usersRoute = require("./routes/users");
const { getAllRecipes, createRecipe, updateRecipe, deleteRecipe, getOneRecipe } = require("./routes/recipes");
const { addFavorite, getAllFavorites, deleteOneFavorite} = require('./routes/favorite-recipe');
const login = require("./routes/login");
const { getAllUsers, getOneUser, createUser, updateUser, deleteUser} = require("./routes/users");
const { getAllIngredients, getAllIngredientsList, getAllSteps, getAllStepsList, deleteOneIngredient, deleteOneStep} = require("./routes/ingredients-steps");
const { getAllServingNumber, getOneServingNumber } = require('./routes/serving-data');
const { getAllRecipeTime, getOneRecipeTime } = require('./routes/recipe-time');
const { getAllUserComments, createComment, getCommentsByRecipeId} = require("./routes/comments");

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

app.use(cookieParser());

// Session store
const sessionStore = new MySQLStore({}, db);

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

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

// Initialisation de multer
const uploadImg = multer({ storage: storage });

// USERS
app.get('/users', getAllUsers);
app.get('/users/:id', getOneUser);
app.post('/users', uploadImg.single('user-image'), createUser);
app.put('/users/:id', uploadImg.single('user-image'), updateUser);
app.delete('/users/:id', deleteUser);

// LOGIN - LOGOUT
app.use('/login', login);
app.post('/logout', async (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                console.error("Erreur lors de la déconnexion :", err);
                return res.status(500).json({ msg: "Erreur lors de la déconnexion" });
            }

            res.clearCookie('session_cookie');

            return res.status(200).json({ msg: "Déconnexion réussie" });
        });
    } catch (error) {
        console.error("Erreur serveur :", error);
        return res.status(500).json({ msg: "Erreur serveur" });
    }
});

// RECIPES
app.get('/recipes', getAllRecipes);
app.get('/recipes/:id', getOneRecipe);
app.post('/recipes', uploadImg.single('recipe-image'), createRecipe);
app.put('/recipes/:id', uploadImg.single('recipe-image'), updateRecipe);
app.delete('/recipes/:id', deleteRecipe);

app.get('/recipe/:id/comments', getCommentsByRecipeId);

// COMMENTS
app.get('/comments', getAllUserComments);
app.post('/comments', createComment);

// FAVORITE
app.get('/favorite', getAllFavorites);
app.post('/users/:id/favorite', addFavorite);
app.delete('/users/:id/favorite', deleteOneFavorite);

// INGREDIENTS & STEPS
app.get('/ingredients', getAllIngredients);
app.get('/ingredients-list', getAllIngredientsList);
app.delete('/ingredients/:id', deleteOneIngredient);
app.get('/steps', getAllSteps);
app.get('/steps-list', getAllStepsList);
app.delete('/steps/:id', deleteOneStep);

// SERVING NUMBER
app.get('/serving-number', getAllServingNumber);
app.get('/serving-number/:id', getOneServingNumber);

// RECIPE TIME
app.get('/recipe-time', getAllRecipeTime);
app.get('/recipe-time/:id', getOneRecipeTime);

sessionStore.onReady().then(() => {
  console.log('✅ MySQLStore ready');
}).catch(error => {
  console.error('❌ MySQLStore error', error);
});

app.listen(PORT, () => {
  console.log(`➡️  BACKEND on port ${PORT} ✅`);
});