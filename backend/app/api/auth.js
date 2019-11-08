const express = require('express');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const { authSecret } = require('../../.env');
const Usuarios = require('../models/usuario');

const router = express.Router();

router.post('/', async (req, res) => {
    if (!req.body.login || !req.body.senha) {
        return res.status(400).send('Informe usuário e senha!');
    }

    const user = await Usuarios.query().select().where({ login: req.body.login }).first();

    if (!user) return res.status(400).send('Usuário não encontrado!');

    const isMatch = bcrypt.compareSync(req.body.senha, user.senha);
    if (!isMatch) return res.status(401).send('Login ou senha inválidos');

    const now = Math.floor(Date.now() / 1000);

    const payload = {
        id: user.id,
        nome: user.nome,
        login: user.login,
        iat: now,
        exp: now + (60 * 60 * 24 * 3),
    };

    res.json({
        ...payload,
        token: jwt.encode(payload, authSecret),
    });
});

router.post('/validate-token', async (req, res) => {
    const userData = req.body || null;
    try {
        if (userData && userData.token) {
            const token = jwt.decode(userData.token, authSecret);
            if (new Date(token.exp * 1000) > new Date()) {
                return res.send(true);
            }
        }
    } catch (msg) {
        // console.log(msg);
        // problema com o token
    }

    res.send(false);
});

module.exports = app => app.use('/auth', router);
