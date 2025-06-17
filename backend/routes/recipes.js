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
        name,
        description,
        imageName, imageData,
        cuisineType,
        cookingType,
        servingNumber,
        difficulty,
        recipeTime,
        ingredientsList,
        stepsList,
        authorId,
        created
    } = req.body;

    console.log(req.body);

    let indexServingNumber = 0;
    let indexRecipeTime = 0;
    let indexRecipeData = 0;
    let indexIngredient = 0;
    let indexStep = 0;

    const insertIntoServingNumber = 'INSERT INTO ServingNumber (number, servingType) VALUES (?, ?)';
    const insertIntoRecipeTime = 'INSERT INTO TimeTable (type, hours, minutes) VALUES ?'; // making , cooking , pause
    const insertIntoRecipeData = 'INSERT INTO RecipeData (name, description, imageName, imageData, cuisineType, cookingType, servingNumberId, difficulty, authorId, recipeTimeId, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const insertIntoIngredient = 'INSERT INTO Ingredient (quantity, unit, name) VALUES (?, ?, ?)';
    const insertIntoStep = 'INSERT INTO Step (number, stepName) VALUES (?, ?)';

    const servingNumberQueries = [servingNumber.number, servingNumber.type];
    const recipeTimeQueries = [
        [recipeTime.making.type, Number(recipeTime.making.hours), Number(recipeTime.making.minutes)],
        [recipeTime.cooking.type, recipeTime.cooking.hours ? Number(recipeTime.cooking.hours) : 0, recipeTime.cooking.minutes ? Number(recipeTime.cooking.minutes) : 0],
        [recipeTime.pause.type, recipeTime.pause.hours ? Number(recipeTime.pause.hours) : 0, recipeTime.pause.minutes ? Number(recipeTime.pause.minutes) : 0],
    ];
    const recipeDataQueries = [
        name, description, imageName, imageData, cuisineType, cookingType, indexServingNumber, difficulty, authorId, indexRecipeTime, created
    ];
    const ingredientQueries = [indexRecipeData, ingredientsList];
    const stepQueries = [indexRecipeData, stepsList];

    // TODO imbriquer les requêtes (recipeData > ...othersTables)

    /* 1. servingNumber & recipeTime creation */
    db.query(insertIntoServingNumber, servingNumberQueries,(err, result) => {
        if(err) {
            console.log('Serving number error : ', err);
            res.status(500).json({error: 'Serving number error : ' + err});
        }

        indexServingNumber = result.insertId;

        res.status(201).json({msg: 'Serving number is created !', result});
    });

    db.query(insertIntoRecipeTime, [recipeTimeQueries], (err, result) => {
        if(err) {
            console.log('Recipe time error : ', err);
            res.status(500).json({error: 'Recipe time error : ' + err});
        }

        indexRecipeTime = result.insertId;

        res.status(201).json({msg: 'Recipe time is created !', result});
    });
    /* ===== */

    /* 2. recipeData creation - get servingNumber & recipeTime IDs */
    db.query(insertIntoRecipeData, recipeDataQueries, (err, result) => {
        if(err) {
            console.log('Recipe data error : ', err);
            res.status(500).json({error: 'Recipe data error : ' + err});
        }

        indexRecipeData = result.insertId;

        res.status(201).json({msg: 'Recipe data is created !', result});
    });
    /* ===== */

    /* 3. ingredientsList & stepsList creation - both get recipeData ID */
    db.query(insertIntoIngredient, ingredientQueries, (err, result) => {
        if(err) {
            console.log('Ingredient error : ', err);
            res.status(500).json({error: 'Ingredient error : ' + err});
        }

        indexIngredient = result.insertId;

        res.status(201).json({msg: 'Ingredient is created !', result});
    });

    db.query(insertIntoStep, stepQueries, (err, result) => {
        if(err) {
            console.log('Step error : ', err);
            res.status(500).json({error: 'Step error : ' + err});
        }

        indexStep = result.insertId;

        res.status(201).json({msg: 'Step is created !', result});
    });
    /* ===== */

    /*function sendIntoDb(insertInto, queries, tableName) {
        db.query(insertInto, queries, (err, rows) => {
            if(err) {
                console.log(tableName + ' error : ', err);
                res.status(500).json({error: tableName + ' error : ' + err});
            }

            indexStep = rows.insertId;

            res.status(201).json({msg: tableName + ' is created !', rows});
        });
    }*/

    /*
    * name
    * description
    * imageName
    * imageData
    * cuisineType
    * cookingType
    * servingNumberId (ID)
        * number
        * type
    * difficulty
    * recipeTime (ID)
        * making
            * hours
            * minutes
        * cooking
            * hours
            * minutes
        * pause
            * hours
            * minutes
    * ingredientsList [ (ID)
        * quantity
        * unit
        * name
      ]
    * stepsList [ (ID)
        * stepName
      ]
    * authorId
    * created
    * */

    //return res.status(201).json({ msg: 'The recipe is created !', response: req.body })
}