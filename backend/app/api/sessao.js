const express = require('express');
const pdf = require('html-pdf');
const options = {format: 'Letter'};
const md5 = require('md5');
const {upload_dir} = require('../../config/paths');
const path = require('path');

const Sessao = require('../models/sessao');

const router = express.Router();

router.get('/', async (req, res) => {
    const id = req.query.id || req.params.id || 0;
    const limit = req.query.limit || null;
    const search = req.query.search || null;
    const filme = req.query.filme || null;
    const inicio = req.query.inicio || null;
    const fim = req.query.fim || null;
    const tipo = req.query.tipo || null;
    const page = req.query.page || 1;

    const data = {
        id,
        limit,
        search,
        page,
        filme,
        inicio,
        fim,
        tipo,
    };

    try {
        const result = await Sessao.get(data);

        res.json(result);
    } catch (msg) {
        console.log(msg);
        res.status(400).send('Bad request!');
    }
});

router.get('/exportar', async (req, res) => {
    const id = req.query.id || req.params.id || 0;
    const limit = req.query.limit || null;
    const search = req.query.search || null;
    const filme = req.query.filme || null;
    const inicio = req.query.inicio || null;
    const fim = req.query.fim || null;
    const tipo = req.query.tipo || null;
    const page = req.query.page || 1;

    const data = {
        id,
        limit,
        search,
        page,
        filme,
        inicio,
        fim,
        tipo,
    };

    try {
        const result = await Sessao.get(data);

        if (result && result.results && result.results.length > 0) {
            const html = function () {
                return `<!doctype html>
<html lang="pt-br">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

    <title>Hello, world!</title>
  </head>
  <body>
  <table class="table table-borderless">
  <thead>
    <tr>
      <th scope="col">Código</th>
      <th scope="col">Título</th>
      <th scope="col">Início</th>
      <th scope="col">Fim</th>
    </tr>
  </thead>
  <tbody>
  
    ${result.results.map((sessao => {
                    return `
                        <tr>
                          <th scope="row">${sessao.id}</th>
                          <td>${sessao.filme.titulo}</td>
                          <td>${sessao.inicio_sessao}</td>
                          <td>${sessao.final_sessao}</td>
                        </tr>    
                    `;
                }))}
  
  </tbody>
</table>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
  </body>
</html>`;
            };

            pdf.create(html(), options).toFile(path.resolve(upload_dir, md5(new Date()) + '.pdf'), function (err, file) {
                if (err) console.log(err);
                else {
                    res.send(path.basename(file.filename));
                }
            });

        } else {
            res.status(401).send('Bad request!');
        }

    } catch (msg) {
        console.log(msg);
        res.status(400).send('Bad request!');
    }
});

const save = async (req, res) => {
    const {sessoes} = req.body;
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
    const {id} = req.query;

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
