const path = require('path');
const { BaseModel } = require('../../database/base-model');

class Sessao extends BaseModel {
    static get tableName() {
        return 'sessao';
    }

    static get idColumn() {
        return 'id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['sala_id', 'filme_id', 'tipo_id', 'inicio_sessao', 'final_sessao', 'valor'],
            properties: {
                id: { type: 'integer' },
                sala_id: { type: 'number' },
                filme_id: { type: 'number' },
                tipo_id: { type: 'number' },
                inicio_sessao: { type: 'string', format: 'date-time' },
                final_sessao: { type: 'string', format: 'date-time' },
                valor: { type: 'number' },
            },
        };
    }

    static get relationMappings() {
        /* eslint import/no-dynamic-require: 0 */
        const Tipo = require(path.resolve(this.modelPaths, 'tipo.js'));
        const Sala = require(path.resolve(this.modelPaths, 'sala.js'));

        return {
            tipo: {
                relation: BaseModel.HasOneRelation,
                modelClass: Tipo,
                join: {
                    from: 'sessao.tipo_id',
                    to: 'tipo.id',
                },
            },
            sala: {
                relation: BaseModel.HasOneRelation,
                modelClass: Sala,
                join: {
                    from: 'sessao.sala_id',
                    to: 'sala.id',
                },
            },
        };
    }

    static async get({
        id,
        limit,
        search,
        page,
        filme,
    }) {
        const query = this.query().select();

        query.eagerAlgorithm(this.JoinEagerAlgorithm)
            .eager('[tipo,sala]');

        if (id !== 0) {
            query.where('sessao.id', id);
        }

        if (filme) {
            query.groupBy(['tipo_id', 'inicio_sessao', 'final_sessao']);
            query.where('filme_id', filme);
        }

        if (limit !== null) {
            query.limit(limit);
        }

        if (page !== 1 && limit !== null) {
            query.offset(page * limit - limit);
        }

        if (id !== 0) {
            return query.first().then();
        }

        const results = await query.then();

        const total = await query.groupBy(filme ? ['tipo_id', 'inicio_sessao', 'final_sessao'] : 'id').resultSize();

        return {
            results,
            total,
        };
    }

    static async save(sessoes) {
        async function upsertSessao(sessao) {
            return new Promise(async (resolve, reject) => {
                const sessao_database = this.query().select('*')
                    .where('inicio', sessao.inicio)
                    .where('fim', sessao.fim);


            });
        }

        const result = Promise.all(sessoes.map(sessao => upsertSessao(sessao)));

        process.exit();

        // if (genero_database && genero_database.id) {
        //     // eslint-disable-next-line no-param-reassign
        //     tipo = { ...genero_database, ...tipo };
        //
        //     return this.query().upsert(tipo, genero_database)
        //         .then((result) => {
        //             if (result) {
        //                 return result;
        //             }
        //             return true;
        //         });
        // }
        // throw 'Não foi possível atualizar tipo!';
    }

    static async softDelete({ id }) {
        const sala = await this.query().select('*').where('sala.id', id)
            .first();

        if (sala && sala.id) {
            return this.query().delete().where('id', sala.id)
                .then();
        }
        throw 'Não foi possível excluir sala!';
    }
}

module.exports = Sessao;
