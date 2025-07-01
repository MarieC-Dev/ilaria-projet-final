const db = require('../middlewares/db_connection');

exports.getAllServingNumber = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM ServingNumber');
        return res.status(200).json({ msg: 'Back Get all serving number', rows });
    } catch (err) {
        return res.status(500).json({ msg: 'Back Get all serving number error', err });
    }
}

exports.getOneServingNumber = async (req, res) => {
    const servingNumberId = req.params.id;

    try {
        await db.execute('SELECT * FROM ServingNumber WHERE id = ?', [servingNumberId], (err, result) => {
            if(err) {
                return res.status(500).json({ msg: 'BackGet one serving number ' + err })
            }
            return res.status(200).json({ msg: 'Back Get one serving number error', result });
        });
    } catch (err) {
        return res.status(500).json({ msg: 'Back Get all serving number error', err });
    }
}