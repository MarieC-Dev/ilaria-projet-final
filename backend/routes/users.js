const db = require("../middlewares/db_connection");
const authMiddleware = require("../middlewares/authMiddleware");
const bcrypt = require("bcryptjs")

exports.getAllUsers = async (req, res) => {
    //res.send('Hello World!');
    try {
        const [usersRows] = await db.query('SELECT * FROM User');
        console.log(usersRows);
        res.status(200).json(usersRows);
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong : ' + error });
    }
};

exports.getUser = async (req, res) => {
    try {
        const [sessionRows] = db.execute('SELECT * FROM Session');
        const session = JSON.parse(sessionRows[0].data);

        return res.status(200).json({ profile: session });
    } catch (error) {
        return res.status(500).json({ errorProfile: 'Utilisateur introuvable ' + error })
    }
}

exports.createUser = async (req, res) => {
    let { imageName, imageData, username, email, password } = req.body;

    if(!username || !email || !password) {
        res.status(400).json({ error: "Le nom, le mail et le mot de passe sont requis" });
    }

    const [usersRows] = await db.execute('SELECT * FROM User');

    bcrypt.hash(password, 10)
        .then(pwdHash => {
            const insertIntoUser = 'INSERT INTO User (imageName, imageData, username, email, password, roleId) VALUES (?, ?, ?, ?, ?, ?)';
            const userQueries = [
                imageName, imageData, username, email, pwdHash, usersRows.length === 0 ? 1 : 3
            ];

            db.query(insertIntoUser, userQueries, (err, result) => {
                if(err) {
                    res.status(500).json({ msg: 'Error create user : ' + err });
                }

                return res.status(201).json(result);
            });
        })
        .catch(error => {
            console.log('Failed to hash password', error)
        })
}