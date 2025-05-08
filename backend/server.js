const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;
const db = require('./middlewares/db_connection.js');
const {getAllRecipes} = require("./routes/recipes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:4200', // specify your frontend origin here
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
//app.use(express.static('public'));

app.get('/', async (req, res) => {
  //res.send('Hello World!');
  try {
    const [rows] = await db.query('SELECT * FROM User');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong : ' + error });
  }
});

app.get('/recipes', getAllRecipes);

app.listen(PORT, () => {
  console.log(`➡️  BACKEND on port ${PORT} ✅`);
});