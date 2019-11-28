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
            required: ['sala_id', 'filme_id', 'tipo_id', 'inicio_sessao', 'final_sessao', 'valor', 'dia_inicio', 'dia_fim'],
            properties: {
                id: { type: 'integer' },
                sala_id: { type: 'number' },
                filme_id: { type: 'number' },
                tipo_id: { type: 'number' },
                inicio_sessao: { type: 'string', format: 'time' },
                final_sessao: { type: 'string', format: 'time' },
                dia_inicio: { type: 'string', format: 'date' },
                dia_fim: { type: 'string', format: 'date' },
                valor: { type: 'number' },
            },
        };
    }

    static get relationMappings() {
        /* eslint import/no-dynamic-require: 0 */
        const Tipo = require(path.resolve(this.modelPaths, 'tipo.js'));
        const Sala = require(path.resolve(this.modelPaths, 'sala.js'));
        const Filme = require(path.resolve(this.modelPaths, 'filme.js'));

        return {
            filme: {
                relation: BaseModel.HasOneRelation,
                modelClass: Filme,
                join: {
                    from: 'sessao.filme_id',
                    to: 'filme.id',
                },
            },
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
        inicio,
        fim,
        tipo,
    }) {
        const query = this.query().select();

        query.eagerAlgorithm(this.JoinEagerAlgorithm)
            .eager('[tipo, sala, filme]');

        if (id !== 0) {
            query.where('sessao.id', id);
        }

        if (filme) {
            query.where('filme_id', filme);
        }

        if (inicio) {
            query.where('inicio_sessao', '>=', inicio);
        }

        if (fim) {
            query.where('final_sessao', '<=', fim);
        }

        if (tipo) {
            query.where('tipo_id', tipo);
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

        const total = await query.groupBy('id').resultSize();

        return {
            results,
            total,
        };
    }

    static async save(sessoes) {
        if (sessoes.id) {
            const sessoes_database = await this.query().select('*').where('id', sessoes.id).first();
            if (sessoes_database && sessoes_database.id) {
                // eslint-disable-next-line no-param-reassign
                sessoes = { ...sessoes_database, ...sessoes };

                return this.query().upsert(sessoes, sessoes_database)
                    .then((result) => {
                        if (result) {
                            return result;
                        }
                        return true;
                    });
            }
            throw 'Não foi possível atualizar sessão!';
        }

        return this.query().upsert(sessoes)
            .then((result) => {
                if (result) {
                    return result;
                }
                return true;
            });
    }

    static async softDelete({ id }) {
        const sessao = await this.query().select('*').where('sessao.id', id)
            .first();

        if (sessao && sessao.id) {
            return this.query().delete().where('id', sessao.id)
                .then();
        }
        throw 'Não foi possível excluir sessão!';
    }
}

module.exports = Sessao;
