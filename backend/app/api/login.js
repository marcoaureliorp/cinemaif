const express = require('express');

const Usuario = require('../models/usuario');

const router = express.Router();

router.get('/', async (req, res) => {
    const { login } = req.query || null;
    const { senha } = req.query || null;

    const data = {
        login,
        senha,
    };

    try {
        const result = await Usuario.login(data);

        res.json(result);
    } catch (msg) {
        res.status(400).send('Bad request!');
    }
});

// return { select, save, softDelete };
module.exports = app => app.use('/login', router);
