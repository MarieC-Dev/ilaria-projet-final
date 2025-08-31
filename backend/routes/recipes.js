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
    let {
        name, description, cuisineType, cookingType, difficulty, ingredientsList, stepsList, authorId, created
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
        pause: {
            type: req.body['recipeTime.pause.type'],
            hours: req.body['recipeTime.pause.hours'],
            minutes: req.body['recipeTime.pause.minutes'],
        },
        cooking: {
            type: req.body['recipeTime.cooking.type'],
            hours: req.body['recipeTime.cooking.hours'],
            minutes: req.body['recipeTime.cooking.minutes'],
        },
    };

    const result = [];

    try {
        if(
            !name || !cuisineType || !cookingType || !servingNumber.number || !servingNumber.type || !difficulty ||
            !recipeTime.making.type || !recipeTime.cooking.type || !recipeTime.pause.type ||
            ingredientsList === [] || stepsList === []
        ) {
            return res.status(404).json({msg: 'recipe time data not found'})
        }

        /* 1. SERVING NUMBER creation */
        const [servingNumberResult] = await db.query(
            'INSERT INTO ServingNumber (number, servingType) VALUES (?, ?)',
            [servingNumber.number, servingNumber.type]
        );

        const servingNumberId = servingNumberResult.insertId;
        /* ===== */

        /* 2. RECIPE DATA creation - get servingNumber & recipeTime IDs */
        const recipeDataQueries = [
            name, description, imageName, cuisineType, cookingType, servingNumberId, difficulty, authorId, created
        ];
        const [recipeDataResult] = await db.query(
            'INSERT INTO RecipeData (name, description, imageName, cuisineType, cookingType, servingNumberId, difficulty, authorId, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            recipeDataQueries
        );

        const recipeDataId = recipeDataResult.insertId;
        result.push(recipeDataResult);
        /* ===== */

        const recipeTimeMakingQueries = [
            recipeTime.making.type, Number(recipeTime.making.hours), Number(recipeTime.making.minutes), recipeDataId
        ];
        const recipeTimePauseQueries = [
            recipeTime.pause.type, Number(recipeTime.pause.hours), Number(recipeTime.pause.minutes), recipeDataId
        ];
        const recipeTimeCookingQueries = [
            recipeTime.cooking.type, Number(recipeTime.cooking.hours), Number(recipeTime.cooking.minutes), recipeDataId
        ];

        const [recipeTimeMaking] = await db.query(
            'INSERT INTO TimeTable (type, hours, minutes, recipeId) VALUES (?, ?, ?, ?)',
            recipeTimeMakingQueries
        );
        const [recipeTimePause] = await db.query(
            'INSERT INTO TimeTable (type, hours, minutes, recipeId) VALUES (?, ?, ?, ?)',
            recipeTimePauseQueries
        );
        const [recipeTimeCooking] = await db.query(
            'INSERT INTO TimeTable (type, hours, minutes, recipeId) VALUES (?, ?, ?, ?)',
            recipeTimeCookingQueries
        );

        /* 3. INGREDIENTS LIST & STEPS LIST creation - both get recipeData ID */
        const ingredientQueries = ingredientsList.map((item) => [item.quantity, item.unit, item.ingredient]);

        const [ingredientResult] = await db.query(
            'INSERT INTO Ingredient (quantity, unit, ingredient) VALUES ?',
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
            msg: 'The recipe has created !',
            servingNumberId,
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
        name, description, cuisineType, cookingType, difficulty, ingredientsList, stepsList, authorId
    } = req.body;

    let imageName = req?.file?.filename;

    const servingNumber = {
        id: req.body['servingNumber.id'],
        number: req.body['servingNumber.number'],
        type: req.body['servingNumber.type'],
    };

    const recipeTime = {
        making: {
            type: req.body['recipeTime.making.type'],
            hours: req.body['recipeTime.making.hours'],
            minutes: req.body['recipeTime.making.minutes'],
        },
        pause: {
            type: req.body['recipeTime.pause.type'],
            hours: req.body['recipeTime.pause.hours'],
            minutes: req.body['recipeTime.pause.minutes'],
        },
        cooking: {
            type: req.body['recipeTime.cooking.type'],
            hours: req.body['recipeTime.cooking.hours'],
            minutes: req.body['recipeTime.cooking.minutes'],
        },
    };

    const result = [];

    try {
        if(
            !name || !cuisineType || !cookingType || !servingNumber.number || !servingNumber.type || !difficulty ||
            !recipeTime.making.type || !recipeTime.cooking.type || !recipeTime.pause.type ||
            ingredientsList === [] || stepsList === []
        ) {
            return res.status(404).json({msg: 'recipe time data not found'})
        }

        /* 1. SERVING NUMBER */
        const [servingNumberResult] = await db.query(
            'UPDATE ServingNumber SET number = ?, servingType = ? WHERE id = ?',
            [servingNumber.number, servingNumber.type, servingNumber.id]
        );

        const servingNumberId = servingNumberResult.insertId;
        /* ===== */

        /* 2. RECIPE DATA creation - get servingNumber & recipeTime IDs */
        const recipeDataQueries = [
            name, description, imageName, cuisineType, cookingType, servingNumberId, difficulty, authorId, recipeId
        ];
        const [recipeDataResult] = await db.query(
            'UPDATE RecipeData SET name = ?, description = ?, imageName = ?, cuisineType = ?, cookingType = ?, servingNumberId = ?, difficulty = ?, authorId = ? WHERE id = ?',
            recipeDataQueries
        );

        const recipeDataId = recipeDataResult.insertId;
        result.push(recipeDataResult);

        /* ===== */

        const recipeTimeMakingQueries = [
            recipeTime.making.type, Number(recipeTime.making.hours), Number(recipeTime.making.minutes), recipeId
        ];
        const recipeTimePauseQueries = [
            recipeTime.pause.type, Number(recipeTime.pause.hours), Number(recipeTime.pause.minutes), recipeId
        ];
        const recipeTimeCookingQueries = [
            recipeTime.cooking.type, Number(recipeTime.cooking.hours), Number(recipeTime.cooking.minutes), recipeId
        ];

        const [recipeTimeMaking] = await db.query(
            'UPDATE TimeTable SET type = ?, hours = ?, minutes = ? WHERE recipeId = ?',
            recipeTimeMakingQueries
        );
        const [recipeTimePause] = await db.query(
            'UPDATE TimeTable SET type = ?, hours = ?, minutes = ? WHERE recipeId = ?',
            recipeTimePauseQueries
        );
        const [recipeTimeCooking] = await db.query(
            'UPDATE TimeTable SET type = ?, hours = ?, minutes = ? WHERE recipeId = ?',
            recipeTimeCookingQueries
        );

        /* 3. INGREDIENTS LIST & STEPS LIST creation - both get recipeData ID */
        await db.query('DELETE FROM IngredientsList WHERE recipeId = ?', [recipeId]);

        const ingredientQueries = ingredientsList.map((item) => [item.quantity, item.unit, item.ingredient]);

        const [ingredientResult] = await db.query(
            'INSERT INTO Ingredient (quantity, unit, ingredient) VALUES ?',
            [ingredientQueries]
        );

        let ingredientId = ingredientResult.insertId;

        const ingredientsIdsArray = [];

        for(let i = 0; i < ingredientQueries.length; i++) {
            ingredientsIdsArray.push(ingredientId++);
        }

        const [ingredientsListResult] = await db.query(
            'INSERT INTO IngredientsList (recipeId, ingredientId) VALUES ?',
            [ingredientsIdsArray.map((id) => [recipeId, id])]
        );

        const ingredientsListId = ingredientsListResult.insertId;

        // steps
        await db.query('DELETE FROM StepsList WHERE recipeId = ?', [recipeId]);

        const stepQueries = stepsList.map((item) => [item.stepName]);

        console.log(stepQueries);

        const [stepResult] = await db.query(
            'INSERT INTO Step (stepName) VALUES ?', [stepQueries]
        );

        let stepId = stepResult.insertId;

        const stepsIdsArray = [];

        for(let i = 0; i < stepQueries.length; i++) {
            stepsIdsArray.push(stepId++);
        }

        const [stepsListResult] = await db.query(
            'INSERT INTO StepsList (recipeId, stepId) VALUES ?',
            [stepsIdsArray.map((id) => [recipeId, id])]
        );

        const stepsListId = stepsListResult.insertId;
        /* ===== */

        /* 4. RESULT - update new recipe */
        return res.status(201).json({
            msg: 'The recipe has updated !',
            servingNumberId,
            recipeDataId,
            ingredientsListId,
            stepsListId
        });
        /* ===== */

    } catch (error) {
        res.status(500).json({ recipeErr: 'BACK Erreur lors de la màj de la recette ' + error })
    }
}

exports.deleteRecipe = async (req, res) => {
    const recipeId = req.params.id;

    const recipeDataSql = 'DELETE FROM RecipeData WHERE id = ?';
    const ingredientsListSql = 'DELETE FROM IngredientsList WHERE recipeId = ?';
    const stepsListSql = 'DELETE FROM StepsList WHERE recipeId = ?';

    db.execute(ingredientsListSql, [recipeId], (err, result) => {
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Liste des ingrédients introuvable' });
        }

        res.json({message: 'Liste des ingrédients supprimée'});
    })

    db.execute(stepsListSql, [recipeId], (err, result) => {
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Liste des étapes introuvable' });
        }

        res.json({message: 'Liste des étapes supprimée'})
    })

    await db.execute(recipeDataSql, [recipeId], (err, result) => {
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Recette introuvable' });
        }

        res.json({message: 'Recette supprimée'});
    });
}