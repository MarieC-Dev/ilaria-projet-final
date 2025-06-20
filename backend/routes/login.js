const express = require('express');
const router = express.Router();
const db = require('../middlewares/db_connection');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
router.use(cookieParser());

router.get('/user', async (req, res) => {
    if(req.session.user) {
        return res.json({ isAuthenticated: true, user: req.session.user });
    } else {
        return res.json({ isAuthenticated: false, msg: 'User not connected' })
    }
})

router.post('/',  async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ msg: "L'email et le mot de passe sont requis" })
    }

    const [loginRows] = await db.execute('SELECT * FROM User WHERE email = ?', [email]);

    if(loginRows.length === 0) {
        return res.status(404).json({ msg: 'Utilisateur introuvable' });
    }

    const userLogin = loginRows[0];

    bcrypt.compare(password, userLogin.password)
        .then(result => {
            if(!result) {
                return res.status(404).json({ msg: "Identifiants incorrectes" })
            }

            let token = jwt.sign(
                { id: userLogin.id, email: userLogin.email },
                process.env.TOKEN_SECRET,
                { expiresIn: '7d' }
            );

            req.session.user = {
                id: userLogin.id,
                username: userLogin.username,
                email: userLogin.email,
                pwd: userLogin.password,
                role: userLogin.role
            }
            req.session.token = token;

            req.session.save(err => {
                if (err) {
                    return res.status(500).json({ session: 'Erreur de sauvegarde de la session' });
                }
                return res.json({ msg: 'Login OK', token, user: req.session.user });
            });
        })
        .catch(error => {
            console.log("Erreur bcrypt compare login : ", error);
        })
})

module.exports = router;