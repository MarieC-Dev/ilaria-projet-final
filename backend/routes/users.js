const express = require("express");
const router = express.Router();
const db = require("../middlewares/db_connection");
const authMiddleware = require("../middlewares/authMiddleware");
const bcrypt = require("bcryptjs")
const {id} = require("nodemon");

exports.getAllUsers = async (req, res) => {
    try {
        const [usersRows] = await db.query('SELECT * FROM User');
        console.log(usersRows);
        res.status(200).json(usersRows);
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong : ' + error });
    }
};

exports.getOneUser = async (req, res) => {
    const userId = req.params.id;
    console.log(userId)

    try {
        const [userRows] = await db.execute('SELECT * FROM User WHERE id = ?', [userId]);

        return res.status(200).json({ profile: userRows });
    } catch (error) {
        return res.status(500).json({ errorProfile: 'Utilisateur introuvable ' + error })
    }
}

exports.createUser = async (req, res) => {
    let { imageName, username, email, password } = req.body;

    if(!username || !email || !password) {
        res.status(400).json({ error: "Le nom, le mail et le mot de passe sont requis" });
    }

    const [usersRows] = await db.execute('SELECT * FROM User');

    bcrypt.hash(password, 10)
        .then(pwdHash => {
            const insertIntoUser = 'INSERT INTO User (imageName, username, email, password, roleId) VALUES (?, ?, ?, ?, ?)';
            const userQueries = [
                imageName, username, email, pwdHash, usersRows.length === 0 ? 1 : 3
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

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const { imageName, username, email, password } = req.body;

    const userSql = 'UPDATE User SET imageName = ?, username = ?, email = ?, password = ? WHERE id = ?';
    const userValues = [imageName, username, email, password, userId];

    await db.execute(userSql, userValues, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'User update error :', err });
        }
        res.json({ message: 'User is updated ' + result });
    })
}