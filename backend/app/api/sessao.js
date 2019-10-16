const express = require('express');

const Sessao = require('../models/sessao');

const router = express.Router();

router.get('/', async (req, res) => {
    const id = req.query.id || req.params.id || 0;
    const limit = req.query.limit || null;
    const search = req.query.search || null;
    const filme = req.query.filme || null;
    const page = req.query.page || 1;

    const data = {
        id,
        limit,
        search,
        page,
        filme,
    };

    try {
        const result = await Sessao.get(data);

        res.json(result);
    } catch (msg) {
        console.log(msg);
        res.status(400).send('Bad request!');
    }
});

const save = async (req, res) => {
    const { sessoes } = req.body;
    try {
        const result = await Sessao.save(sessoes);

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
        const result = await Sessao.softDelete(data);

        if (result) {
            res.sendStatus(204);
        }
    } catch (msg) {
        console.log(msg);
        res.sendStatus(400);
    }
});

// return { select, save, softDelete };
module.exports = app => app.use('/sessoes', router);
