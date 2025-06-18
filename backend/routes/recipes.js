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
    let {
        name, description, imageName, imageData, cuisineType, cookingType, servingNumber, difficulty, recipeTime, ingredientsList, stepsList, authorId, created
    } = req.body;

    const result = [];

    console.log(authorId);

    try {
        if(
            !name || !cuisineType || !cookingType || !servingNumber.number || !servingNumber.type || !difficulty ||
            !recipeTime.making.type || !recipeTime.cooking.type || !recipeTime.pause.type ||
            ingredientsList === [] || stepsList === []
        ) {
            return res.status(404).json({msg: 'recipe time data not found'})
        }

        /* 1. SERVING NUMBER & RECIPE TIME creation */
        const recipeTimeQueries = [
            [recipeTime.making.type, Number(recipeTime.making.hours), Number(recipeTime.making.minutes)],
            [recipeTime.cooking.type, recipeTime.cooking.hours ? Number(recipeTime.cooking.hours) : 0, recipeTime.cooking.minutes ? Number(recipeTime.cooking.minutes) : 0],
            [recipeTime.pause.type, recipeTime.pause.hours ? Number(recipeTime.pause.hours) : 0, recipeTime.pause.minutes ? Number(recipeTime.pause.minutes) : 0],
        ];

        const [servingNumberResult] = db.promise().query(
            'INSERT INTO ServingNumber (number, servingType) VALUES (?, ?)',
            [servingNumber.number, servingNumber.type]
        );

        const [recipeTypeResult] = db.promise().query(
            'INSERT INTO TimeTable (type, hours, minutes) VALUES ?',
            recipeTimeQueries
        );

        const servingNumberId = servingNumberResult.insertId;
        const recipeTimeId = recipeTypeResult.insertId;
        /* ===== */

        /* 2. RECIPE DATA creation - get servingNumber & recipeTime IDs */
        const recipeDataQueries = [
            name, description, imageName, imageData, cuisineType, cookingType, servingNumberId, difficulty, 0, recipeTimeId, created
        ];
        const [recipeDataResult] = db.promise().query(
            'INSERT INTO RecipeData (name, description, imageName, imageData, cuisineType, cookingType, servingNumberId, difficulty, authorId, recipeTimeId, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [ recipeDataQueries ]
        );
        const recipeDataId = recipeDataResult.insertId;
        result.push(recipeDataResult);
        /* ===== */

        /* 3. INGREDIENTS LIST & STEPS LIST creation - both get recipeData ID */
        const [ingredientResult] = db.promise().query(
            'INSERT INTO Ingredient (quantity, unit, name) VALUES (?, ?, ?)',
            [ingredientsList[0].quantity, ingredientsList[0].unit, ingredientsList[0].name]
        );
        const ingredientId = ingredientResult.insertId;

        const [ingredientsListResult] = db.promise().query(
            'INSERT INTO IngredientsList (recipeId, ingredientId) VALUES (?, ?)',
            [recipeDataId, ingredientId]
        );
        const ingredientsListId = ingredientsListResult.insertId;

        const [stepResult] = db.promise().query(
            'INSERT INTO Step (number, stepName) VALUES (?, ?, ?)',
            [stepsList[0].number, stepsList[0].stepName]
        );
        const stepId = stepResult.insertId;

        const [stepsListResult] = db.promise().query(
            'INSERT INTO StepsList (recipeId, stepId) VALUES (?, ?)',
            [recipeDataId, stepId]
        );
        const stepsListId = stepsListResult.insertId;

        return res.status(201).json({
            msg: 'The recipe is created !',
            servingNumberId,
            recipeTimeId,
            recipeDataId,
            ingredientsListId,
            stepsListId
        });
        /* ===== */
    } catch (error) {
        res.status(500).json({ recipeErr: 'Erreur lors de la création de la recette ' + error })
    }

    console.log(result);

    //return res.status(201).json({ msg: 'The recipe is created !', response: req.body })
}