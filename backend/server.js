const express = require('express');
const cors = require('cors');

const app = express();
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

app.get('/recipes', getAllRecipes);
app.post('/recipes', createRecipe);

app.get('/users', getAllUsers);
app.post('/create-user', createUser);

app.listen(PORT, () => {
  console.log(`➡️  BACKEND on port ${PORT} ✅`);
});