const express = require('express');

const FilmeGenero = require('../models/filme_genero');

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
        const result = await FilmeGenero.get(data);

        res.json(result);
    } catch (msg) {
        res.status(400).send('Bad request!');
    }
});

const save = async (req, res) => {
    const { filme_id, filme_genero } = req.body;

    try {
        const result = await FilmeGenero.save(filme_id, filme_genero);

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
        const result = await FilmeGenero.softDelete(data);

        if (result) {
            res.sendStatus(204);
        }
    } catch (msg) {
        console.log(msg);
        res.sendStatus(400);
    }
});

// return { select, save, softDelete };
module.exports = app => app.use('/filmes_generos', router);
