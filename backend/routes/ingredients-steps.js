const db = require('../middlewares/db_connection');

exports.getAllIngredients = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM Ingredient');
        return res.status(200).json({ msg: 'Back get all ingredients ', rows })
    } catch (err) {
        console.log('Back error get all ingredients ', err)
    }
}

exports.getAllIngredientsList = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM IngredientsList');
        return res.status(200).json({ msg: 'Back get all ingredients list ', rows })
    } catch (err) {
        console.log('Back error get all ingredients list ', err)
    }
}

exports.getAllSteps = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM Step');
        return res.status(200).json({ msg: 'Back get all steps ', rows })
    } catch (err) {
        console.log('Back error get all ingredients ', err)
    }
}

exports.getAllStepsList = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM StepsList');
        return res.status(200).json({ msg: 'Back get all steps list ', rows })
    } catch (err) {
        console.log('Back error get all steps list ', err)
    }
}