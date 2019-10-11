const express = require('express');

const Filme = require('../models/filme');

const router = express.Router();

router.get('/:id?', async (req, res) => {
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
        const result = await Filme.get(data);

        res.json(result);
    } catch (msg) {
        console.log(msg);
        res.status(400).send('Bad request!');
    }
});

const save = async (req, res) => {
    try {
        const { upload } = require('../util/fileupload');

        upload(req, res, async (files, fields) => {
            const filme = { ...fields };

            if (filme.id) filme.id = Number(filme.id);

            if (filme.titulo.trim() === '') {
                throw 'Título inválido!';
            }

            const result = await Filme.save(filme);

            if (result === true) {
                res.sendStatus(204);
            } else {
                res.json(result);
            }
        });
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
        const result = await Filme.softDelete(data);

        if (result) {
            res.sendStatus(204);
        }
    } catch (msg) {
        console.log(msg);
        res.sendStatus(400);
    }
});

// return { select, save, softDelete };
module.exports = app => app.use('/filmes', router);
