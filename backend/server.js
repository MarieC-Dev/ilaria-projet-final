const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;
const db = require('./middlewares/db_connection.js');
const {getAllRecipes} = require("./routes/recipes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/all-recipes', getAllRecipes);

app.listen(PORT, () => {
  console.log(`➡️  BACKEND on port ${PORT} ✅`); 
});