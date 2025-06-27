const db = require('../middlewares/db_connection');

exports.getAllUserComments = async (req, res) => {
    const recipeId = req.params.id;

    try {
        const [rows] = await db.execute('SELECT * FROM Comment WHERE id = ?', recipeId);
        return res.status(200).json({message: 'All user comments', rows})
    } catch (error) {
        return res.status(500).json({ error: 'Error get all user comments' });
    }
}

exports.createComment = async (req, res) => {
    const recipeId = req.params.id;
    const { userId, note, comment, created } = req.body;

    if(!recipeId || !userId || !note || !created) { // comment isn't required
        return res.status(404).json({ error: 'Data not found' })
    }

    const commentSql = 'INSERT INTO Comment (id, recipeId, userId, note, comment, created) VALUES (?, ?, ?, ?, ?, ?)';
    const commentQueries = [recipeId, userId, note, comment, created];

    await db.execute(commentSql, [commentQueries], (err, result) => {
        if(err) {
            return res.status(500).json({ error: 'Erreur lors de la création du commentaire ' + err })
        }

        return res.status(201).json({ message: 'Comment created ' + result });
    });
}

exports.deleteComment = async (req, res) => {
    const recipeId = req.params.id;

    await db.execute('DELETE FROM Comment WHERE id = ?', recipeId, (err, result) => {
        if(err) {
            return res.status(500).json({ error: 'Erreur lors de la suppression du commentaire ' + err })
        }
        return res.json({ message: 'Commentaire supprimé' })
    })
}
