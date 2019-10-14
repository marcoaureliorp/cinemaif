
exports.up = function (knex) {
    return knex.schema.alterTable('usuario_sessao', (table) => {
        table.date('dia').notNullable();
    }).then(() => knex.schema.alterTable('sessao', (table) => {
        table.date('dia_inicio').notNullable();
        table.date('dia_fim').notNullable();
        table.time('inicio_sessao').notNullable().alter();
        table.time('final_sessao').notNullable().alter();
    }));
};

exports.down = function (knex) {
    return knex.schema.alterTable('usuario_sessao', (table) => {
        table.dropColumn('dia');
    }).then(() => knex.schema.alterTable('sessao', (table) => {
        table.dropColumn('dia_inicio');
        table.dropColumn('dia_fim');
        table.dateTime('inicio_sessao').notNullable().alter();
        table.dateTime('final_sessao').notNullable().alter();
    }));
};
