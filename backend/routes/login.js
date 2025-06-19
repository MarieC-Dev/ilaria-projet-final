const express = require('express');
const router = express.Router();
const db = require('../database');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
router.use(cookieParser());

exports.userConnected = async (req, res) => {
    if(req.session.user) {
        return res.json({ isAuthenticated: true, user: req.session.user });
    } else {
        return res.json({ isAuthenticated: false, msg: 'User not connected' })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ msg: "L'email et le mot de passe sont requis" })
    }

    const [loginRows] = db.execute('SELECT * FROM User WHERE email = ?', [email]);

    if(loginRows.length === 0) {
        return res.status(404).json({ msg: 'Utilisateur introuvable' });
    }

    bcrypt.compare(password, loginRows[0].password)
        .then(result => {
            if(!result) {
                return res.status(404).json({ msg: "Identifiants incorrectes" })
            }

            let token = jwt.sign(
                { id: loginRows[0].id, email: loginRows[0].email },
                process.env.TOKEN_SECRET,
                { expiresIn: '7d' }
            );

            req.session.user = {
                id: loginRows[0].id,
                username: loginRows[0].username,
                email: loginRows[0].email,
                pwd: loginRows[0].password,
                role: loginRows[0].role
            }
            req.session.token = token;

            req.session.save(err => {
                if (err) {
                    return res.status(500).json({ session: 'Erreur de sauvegarde de la session' });
                }
                // ✅ Envoi de la réponse finale (UNE SEULE FOIS)
                return res.json({ msg: 'Login OK', token, user: req.session.user });
            });
        })
        .catch(error => {
            console.log("Erreur bcrypt compare login : ", error)
        })
}