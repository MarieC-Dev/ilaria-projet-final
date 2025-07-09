const db = require('../middlewares/db_connection');

exports.getAllUserComments = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM Comments');
        return res.status(200).json({message: 'All user comments', rows})
    } catch (error) {
        return res.status(500).json({ error: 'Error get all user comments' });
    }
}

exports.createComment = async (req, res) => {
    const { recipeId, userId, note, commentText, created } = req.body;

    console.log("Requête reçue : ", req.body);

    if (recipeId === 0 || userId === 0 || recipeId === null || userId === null) {
        console.log("Identifiants incorrects");
        return res.status(401).json({ error: 'Recipe ID or User ID is incorrect' });
    }

    try {
        console.log("Tentative d'insertion dans la base de données...");

        const commentSql = 'INSERT INTO Comments (recipeId, userId, note, commentText, created) VALUES (?, ?, ?, ?, ?)';
        const commentQueries = [recipeId, userId, note, commentText, created];

        const [result] = await db.execute(commentSql, commentQueries);
        return res.status(201).json({ msg: 'Back post comment success', result });

    } catch (err) {
        console.error('Erreur dans la requête:', err);
        return res.status(500).json({ error: 'Back comment error ' + err });
    }
};

/*
exports.deleteComment = async (req, res) => {
    const recipeId = req.params.id;

    await db.execute('DELETE FROM Comments WHERE id = ?', recipeId, (err, result) => {
        if(err) {
            return res.status(500).json({ error: 'Erreur lors de la suppression du commentaire ' + err })
        }
        return res.json({ message: 'Commentaire supprimé' })
    })
}
*/
