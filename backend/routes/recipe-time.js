const db = require("../middlewares/db_connection");
exports.getAllRecipeTime = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM TimeTable');
        return res.status(200).json({ msg: 'Back Get all recipe time', rows });
    } catch (err) {
        return res.status(500).json({ msg: 'Back Get all recipe time error', err });
    }
}

exports.getOneRecipeTime = async (req, res) => {
    const recipeTimeId = req.params.id;

    try {
        await db.execute('SELECT * FROM ServingNumber WHERE id = ?', [recipeTimeId], (err, result) => {
            if(err) {
                return res.status(500).json({ msg: 'BackGet one recipe time ' + err })
            }
            return res.status(200).json({ msg: 'Back Get one recipe time error', result });
        });
    } catch (err) {
        return res.status(500).json({ msg: 'Back Get all recipe time error', err });
    }
}