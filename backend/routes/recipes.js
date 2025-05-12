const db = require('../middlewares/db_connection');

exports.getAllRecipes = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM RecipeData');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong : ' + error });
    }
}

exports.createRecipe = async (req, res) => {
    const { recipe } = req.body;
    console.log(recipe);
}