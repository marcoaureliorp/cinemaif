const express = require('express');
const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');

const router = express.Router();

router.get('/', async (req, res) => {
    const id = req.query.id || req.params.id || 0;
    const limit = req.query.limit || null;
    const search = req.query.search || null;
    const page = req.query.page || 1;

    const data = {
        id,
        limit,
        search,
        page,
    };

    try {
        const result = await Usuario.get(data);

        res.json(result);
    } catch (msg) {
        res.status(400).send('Bad request!');
    }
});

const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

const save = async (req, res) => {
    const { usuario } = req.body;

    if (req.params.id) usuario.id = Number(req.params.id);

    try {
        if (usuario.id === undefined && usuario.login.trim() === '') {
            throw 'Login inválida!';
        }

        if (usuario.senha) usuario.senha = encryptPassword(usuario.senha);

        const result = await Usuario.save(usuario);

        if (result === true) {
            res.sendStatus(204);
        } else {
            res.json(result);
        }
    } catch (msg) {
        console.log(msg);
        res.status(400).send(msg);
    }
};

router.put('/', save);
router.post('/', save);

router.delete('/', async (req, res) => {
    const { id } = req.query;

    const data = {
        id,
    };

    try {
        const result = await Usuario.softDelete(data);

        if (result) {
            res.sendStatus(204);
        }
    } catch (msg) {
        console.log(msg);
        res.sendStatus(400);
    }
});

// return { select, save, softDelete };
module.exports = app => app.use('/usuarios', router);
