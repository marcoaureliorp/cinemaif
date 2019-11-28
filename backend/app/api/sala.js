const express = require('express');

const Sala = require('../models/sala');

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
        const result = await Sala.get(data);

        res.json(result);
    } catch (msg) {
        res.status(400).send('Bad request!');
    }
});

const save = async (req, res) => {
    const { sala } = req.body;

    if (req.params.id) sala.id = Number(req.params.id);

    try {
        if (sala.id === undefined && sala.numero.trim() === '') {
            throw 'Número inválido!';
        }

        const result = await Sala.save(sala);

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
        const result = await Sala.softDelete(data);

        if (result) {
            res.sendStatus(204);
        }
    } catch (msg) {
        res.sendStatus(400);
    }
});

// return { select, save, softDelete };
module.exports = app => app.use('/salas', router);
