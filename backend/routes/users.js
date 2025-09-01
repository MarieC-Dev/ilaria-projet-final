const express = require("express");
const router = express.Router();
const db = require("../middlewares/db_connection");
const bcrypt = require("bcryptjs")

exports.getAllUsers = async (req, res) => {
    try {
        const [usersRows] = await db.query('SELECT * FROM User');
        res.status(200).json(usersRows);
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong : ' + error });
    }
};

exports.getOneUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const [userRows] = await db.execute('SELECT * FROM User WHERE id = ?', [userId]);

        return res.status(200).json({ profile: userRows });
    } catch (error) {
        return res.status(500).json({ errorProfile: 'Utilisateur introuvable ' + error })
    }
}

exports.createUser = async (req, res) => {
    let { username, email, password, created } = req.body;
    let imageName = req.file?.filename;

    if(!imageName || !username || !email || !password) {
        console.log('il manque des infos...')
        return res.status(400).json({ error: "Le nom, le mail et le mot de passe sont requis" });
    }

    const [usersRows] = await db.execute('SELECT * FROM User');
    const pwdHash = await bcrypt.hash(password, 10);

    const insertIntoUser = 'INSERT INTO User (imageName, username, email, password, roleId, created) VALUES (?, ?, ?, ?, ?, ?)';
    const userQueries = [
        imageName, username, email, pwdHash, usersRows.length === 0 ? 1 : 3, created
    ];

    const [result] = await db.query(insertIntoUser, userQueries, (err, result) => {
        if(err) {
            res.status(500).json({ msg: 'Error create user : ' + err });
        } else {
            console.log('User created successfully');
        }
    });

    return res.status(201).json(result);
}

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const { username, role, email, password } = req.body;
    let imageName = req?.file?.filename;

    console.log(req.body);

    if(!username || !email || !role) {
        return res.status(400).json({ error: "Le nom, le mail et le mot de passe sont requis" });
    }

    if(imageName) {
        const userSql = 'UPDATE User SET imageName = ? WHERE id = ?';

        await db.query(userSql, [imageName, userId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'User image name error :', err });
            }
            res.json({ message: 'User image name updated ' + result });
        });
    }

    if(password) {
        const userSql = 'UPDATE User SET username = ?, roleId = ?, email = ?, password = ? WHERE id = ?';
        const pwdHash = await bcrypt.hash(password, 10);

        const [result] = await db.query(userSql, [username, role, email, pwdHash, userId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'User update error :', err });
            } else {
                console.log('User has been updated !')
            }
        });

        return res.json({ message: 'User : ' + result });
    } else {
        const userSql = 'UPDATE User SET username = ?, roleId = ?, email = ? WHERE id = ?';

        const [result] = await db.query(userSql, [username, role, email, userId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'User update error :', err });
            } else {
                console.log('User has been updated !')
            }
        });

        return res.json({ message: 'User : ' + result });
    }
}

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    const userSql = 'DELETE FROM User WHERE id = ?';

    try {
        const [result] = await db.execute(userSql, [userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        return res.status(204).send(); // ✅ connexion terminée
    } catch (err) {
        console.error('Erreur lors de la suppression:', err);
        return res.status(500).json({ error: 'Erreur serveur' });
    }
};