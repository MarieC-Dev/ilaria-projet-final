const db = require('../middlewares/db_connection');
const {id} = require("nodemon");

exports.getAllFavorites = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM FavoritesList');
        console.log(rows)
        res.status(200).json({ message: 'Favorites : ' + rows[0] })
    } catch (err) {
        res.status(500).json({ error: 'Get all favorites error ' + err })
    }
}

exports.getOneFavorite = async (req, res) => {
    const favoriteId = req.params.id;

    try {
        const [rows] = await db.execute('SELECT * FROM FavoritesList WHERE id = ?', [favoriteId]);
        console.log(rows)
        res.status(200).json({ message: 'Favorites : ' + rows[0] })
    } catch (err) {
        res.status(500).json({ error: 'Get all favorites error ' + err })
    }
}

exports.addFavorite = async (req, res) => {
    const { recipeId, userId } = req.body;

    if(!recipeId || !userId) {
        return res.status(404).json({ error: 'Favorite data is missing' })
    }

    try {
        const favoriteSql = 'INSERT INTO FavoritesList (recipeId, userId) VALUES (?, ?)';

        db.execute(favoriteSql, [recipeId, userId], (err, result) => {
            if(err) {
                return res.status(500).json({ error: 'Back add favorite error : ' + err })
            }
            return res.status(201).json({ message: 'Favorite adding : ' + result })
        })
    } catch (error) {
        res.status(500).json({ favoriteErr: 'BACK Erreur lors de l\'ajout du favoris ' + error })
    }
}

exports.deleteOneFavorite = async (req, res) => {
    const favoriteId = req.params.id;

    try {
        const favoriteSql = 'DELETE FROM FavoritesList WHERE id = ?';

        db.execute(favoriteSql, [favoriteId], (err, result) => {
            if(err) {
                return res.status(500).json({ error: 'Suppression du favoris ' + err })
            }
            return res.json({ message: 'Favoris supprimé' })
        })

    } catch (err) {
        res.status(500).json({ error: 'Suppression du favoris (catch) ' + err })
    }
}