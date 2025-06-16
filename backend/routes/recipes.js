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
    /*const { recipe } = req.body;
    console.log(recipe);*/

    let {
        name,
        description,
        imageName, imageData,
        cuisineType,
        cookingType,
        servingNumber,
        difficulty,
        recipeTime,
        created
    } = req.body;

    console.log(req.body);

    // cuisineTypeId (ID) - cookingTypeId (ID) - servingNumberId (ID) - recipeTimeId (ID)
    const querySqlRecipe = 'INSERT INTO User (name, description, imageName, imageData, cuisineType, cookingType, servingNumber, difficulty, recipeTime, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    /*
    * name
    * description
    * imageName
    * imageData
    * cuisineTypeId (ID) -> push data into table and get its ID
    * cookingTypeId (ID)
    * servingNumberId (ID)
    * difficulty
    * authorId
    * recipeTimeId (ID)
    * created
    * */



    return res.status(201).json({ msg: 'The recipe is created !', response: req.body })
}