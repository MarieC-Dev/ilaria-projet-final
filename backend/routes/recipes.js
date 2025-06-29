const db = require('../middlewares/db_connection');

exports.getAllRecipes = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM RecipeData');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong : ' + error });
    }
}

exports.getOneRecipe = async (req, res) => {
    const recipeId = req.params.id;

    try {
        const [rows] = await db.query('SELECT * FROM RecipeData WHERE id = ?', recipeId);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong : ' + error });
    }
}

exports.createRecipe = async (req, res) => {
    /*let {
        name, description, imageName, imageData, cuisineType, cookingType, servingNumber, difficulty, recipeTime, ingredientsList, stepsList, authorId, created
    } = req.body;*/
    let {
        name, description, imageData, cuisineType, cookingType, difficulty, ingredientsList, stepsList, authorId, created
    } = req.body;

    let imageName = req.file.filename;

    const servingNumber = {
        number: req.body['servingNumber.number'],
        type: req.body['servingNumber.type'],
    };

    const recipeTime = {
        making: {
            type: req.body['recipeTime.making.type'],
            hours: req.body['recipeTime.making.hours'],
            minutes: req.body['recipeTime.making.minutes'],
        },
        cooking: {
            type: req.body['recipeTime.cooking.type'],
            hours: req.body['recipeTime.cooking.hours'],
            minutes: req.body['recipeTime.cooking.minutes'],
        },
        pause: {
            type: req.body['recipeTime.pause.type'],
            hours: req.body['recipeTime.pause.hours'],
            minutes: req.body['recipeTime.pause.minutes'],
        }
    };

    const result = [];

    console.log('BODY : ', req.body);
    console.log('FILE response : ', req.file);

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
            recipeTime.making.type, Number(recipeTime.making.hours), Number(recipeTime.making.minutes),
            recipeTime.pause.type, Number(recipeTime.pause.hours), Number(recipeTime.pause.minutes),
            recipeTime.cooking.type, Number(recipeTime.cooking.hours), Number(recipeTime.cooking.minutes),
        ];

        const [servingNumberResult] = await db.query(
            'INSERT INTO ServingNumber (number, servingType) VALUES (?, ?)',
            [servingNumber.number, servingNumber.type]
        );

        const [recipeTypeResult] = await db.query(
            'INSERT INTO TimeTable (typeMaking, makingH, makingMin, typePause, pauseH, pauseMin, typeCooking, cookingH, cookingMin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            recipeTimeQueries
        );

        const servingNumberId = servingNumberResult.insertId;
        const recipeTimeId = recipeTypeResult.insertId;
        /* ===== */

        /* 2. RECIPE DATA creation - get servingNumber & recipeTime IDs */
        const recipeDataQueries = [
            name, description, imageName, imageData, cuisineType, cookingType, servingNumberId, difficulty, authorId, recipeTimeId, created
        ];
        const [recipeDataResult] = await db.query(
            'INSERT INTO RecipeData (name, description, imageName, imageData, cuisineType, cookingType, servingNumberId, difficulty, authorId, recipeTimeId, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            recipeDataQueries
        );

        const recipeDataId = recipeDataResult.insertId;
        result.push(recipeDataResult);
        /* ===== */

        /* 3. INGREDIENTS LIST & STEPS LIST creation - both get recipeData ID */
        const ingredientQueries = ingredientsList.map((item) => [item.quantity, item.unit, item.name]);

        const [ingredientResult] = await db.query(
            'INSERT INTO Ingredient (quantity, unit, name) VALUES ?',
            [ingredientQueries]
        );

        let ingredientId = ingredientResult.insertId;

        const ingredientsIdsArray = [];

        for(let i = 0; i < ingredientQueries.length; i++) {
            ingredientsIdsArray.push(ingredientId++);
        }

        const [ingredientsListResult] = await db.query(
            'INSERT INTO IngredientsList (recipeId, ingredientId) VALUES ?',
            [ingredientsIdsArray.map((id) => [recipeDataId, id])]
        );

        const ingredientsListId = ingredientsListResult.insertId;

        // steps
        const stepQueries = stepsList.map((item) => [item.stepName]);

        const [stepResult] = await db.query(
            'INSERT INTO Step (stepName) VALUES ?',
            [stepQueries]
        );

        let stepId = stepResult.insertId;

        let stepsIdsArray = [];

        for(let i = 0; i < stepQueries.length; i++) {
            stepsIdsArray.push(stepId++);
        }

        const [stepsListResult] = await db.query(
            'INSERT INTO StepsList (recipeId, stepId) VALUES ?',
            [stepsIdsArray.map((id) => [recipeDataId, id])]
        );

        const stepsListId = stepsListResult.insertId;
        /* ===== */

        /* 4. RESULT - creation new recipe */
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
        res.status(500).json({ recipeErr: 'BACK Erreur lors de la création de la recette ' + error })
    }
}

exports.updateRecipe = async (req, res) => {
    const recipeId = req.params.id;
    let {
        name, description, imageName, imageData, cuisineType, cookingType, servingNumber, difficulty, recipeTime, ingredientsList, stepsList, authorId, created
    } = req.body;

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
            recipeTime.making.type, Number(recipeTime.making.hours), Number(recipeTime.making.minutes),
            recipeTime.pause.type, Number(recipeTime.pause.hours), Number(recipeTime.pause.minutes),
            recipeTime.cooking.type, Number(recipeTime.cooking.hours), Number(recipeTime.cooking.minutes),
            recipeId
        ];

        await db.query(
            'UPDATE ServingNumber SET number = ?, servingType = ? WHERE id = ?',
            [servingNumber.number, servingNumber.type, recipeId]
        );

        await db.query(
            'UPDATE TimeTable SET typeMaking = ?, makingH = ?, makingMin = ?, typePause = ?, pauseH = ?, pauseMin = ?, typeCooking = ?, cookingH = ?, cookingMin = ? WHERE id = ?',
            recipeTimeQueries
        );
        /* ===== */

        /* 2. RECIPE DATA creation - get servingNumber & recipeTime IDs */
        const recipeDataQueries = [
            name, description, imageName, imageData, cuisineType, cookingType, difficulty, authorId, created, recipeId
        ];
        await db.query(
            'UPDATE RecipeData SET name = ?, description = ?, imageName = ?, imageData = ?, cuisineType = ?, cookingType = ?, difficulty = ?, authorId = ?, created = ? WHERE id = ?',
            recipeDataQueries
        );
        /* ===== */

        /* 3. INGREDIENTS LIST & STEPS LIST creation - both get recipeData ID */
        const ingredientQueries = ingredientsList.map((item) => [item.quantity, item.unit, item.name, recipeId]);

        await db.query(
            'UPDATE Ingredient SET quantity = ?, unit = ?, name = ? WHERE id = ?',
            [ingredientQueries]
        );

        // steps
        const stepQueries = stepsList.map((item) => [item.stepName, recipeId]);

        await db.query(
            'INSERT INTO Step (stepName) VALUES ?',
            [stepQueries]
        );
        /* ===== */

        /* 4. RESULT - creation new recipe */
        return res.status(201).json({ msg: 'The recipe is update !', recipeId });
        /* ===== */
    } catch (error) {
        res.status(500).json({ recipeErr: 'BACK Erreur lors de la création de la recette ' + error })
    }
}

exports.deleteRecipe = async (req, res) => {
    const recipeId = req.params.id;

    const recipeDataSql = 'DELETE FROM RecipeData WHERE id = ?'
    const ingredientsListSql = 'DELETE FROM IngredientsList WHERE id = ?'
    const stepsListSql = 'DELETE FROM StepsList WHERE id = ?'

    await db.query(recipeDataSql, [recipeId], (err, result) => {
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Recette non trouvé' });
        }

        db.query(ingredientsListSql, [recipeId], (err, result) => {
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Liste des ingrédients non trouvé' });
            }

            res.json({message: 'Liste des ingrédients supprimée'});
        })

        db.query(stepsListSql, [recipeId], (err, result) => {
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Liste des étapes non trouvé' });
            }

            res.json({message: 'Liste des étapes supprimée'})
        })

        res.json({message: 'Recette supprimée'});
    })
}