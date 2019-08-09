exports.up = function (knex) {
    return knex.schema.createTable('tipo', function (table) {
        table.increments('id').primary();
        table.string('descricao', 255).notNullable();
    })
        .then(function () {
            return knex.schema.createTable('usuario', function (table) {
                table.increments('id').primary();
                table.string('login', 255).notNullable();
                table.string('senha', 255).notNullable();
                table.date('data_nascimento');
                table.integer('admin', 1).notNullable().defaultTo(0);
            });
        })
        .then(function () {
            return knex.schema.createTable('sala', function (table) {
                table.increments('id').primary();
                table.integer('cadeiras', 11).notNullable();
                table.string('numero', 50).notNullable();
            })
        })
        .then(function () {
            return knex.schema.createTable('genero', function (table) {
                table.increments('id').primary();
                table.string('descricao', 255).notNullable();
            })
        })
        .then(function () {
            return knex.schema.createTable('filme', function (table) {
                table.increments('id').primary();
                table.string('titulo', 255).notNullable();
                table.string('sinopse', 255).notNullable();
                table.time('duracao').notNullable();
                table.string('classificacao', 10).notNullable();
                table.string('capa', 255).notNullable();
            })
        })
        .then(function () {
            return knex.schema.createTable('sessao', function (table) {
                table.increments('id').primary();
                table.integer('sala_id').unsigned().notNullable();
                table.integer('filme_id').unsigned().notNullable();
                table.integer('tipo_id').unsigned().notNullable();
                table.dateTime('inicio_sessao').notNullable();
                table.dateTime('final_sessao').notNullable();
                table.float('valor', 30, 2).notNullable();
                table.foreign('filme_id').references('id').inTable('filme');
                table.foreign('sala_id').references('id').inTable('sala');
                table.foreign('tipo_id').references('id').inTable('tipo');
            })
        })
        .then(function () {
            return knex.schema.createTable('filme_genero', function (table) {
                table.integer('filme_id').unsigned().notNullable();
                table.integer('genero_id').unsigned().notNullable();
                table.foreign('filme_id').references('id').inTable('filme');
                table.foreign('genero_id').references('id').inTable('genero');
            })
        })
        .then(function () {
            return knex.schema.createTable('usuario_sessao', function (table) {
                table.integer('usuario_id').unsigned().notNullable();
                table.integer('sessao_id').unsigned().notNullable();
                table.string('cadeira', 20).notNullable();
                table.foreign('usuario_id').references('id').inTable('usuario');
                table.foreign('sessao_id').references('id').inTable('sessao');
            })
        })
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('filme_genero'),
        knex.schema.dropTable('usuario_sessao'),
        knex.schema.dropTable('sessao'),
        knex.schema.dropTable('tipo'),
        knex.schema.dropTable('usuario'),
        knex.schema.dropTable('sala'),
        knex.schema.dropTable('genero'),
        knex.schema.dropTable('filme'),
    ]);
};
