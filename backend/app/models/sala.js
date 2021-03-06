const path = require('path');
const { BaseModel } = require('../../database/base-model');

class Sala extends BaseModel {
    static get tableName() {
        return 'sala';
    }

    static get idColumn() {
        return 'id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['cadeiras', 'numero'],
            properties: {
                id: { type: 'integer' },
                cadeiras: { type: 'string', minLength: 1, maxLength: 11 },
                numero: { type: 'string', minLength: 1, maxLength: 50 },
            },
        };
    }

    static async get({
        id,
        limit,
        search,
        page,
    }) {
        const query = this.query().select();

        if (id !== 0) {
            query.where('sala.id', id);
        }

        if (search !== null) {
            query.where('numero', 'like', `%${search}%`);
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

    static async save(tipo) {
        if (tipo.id) {
            const sala_database = await this.query().select('*').where('id', tipo.id).first();
            if (sala_database && sala_database.id) {
                // eslint-disable-next-line no-param-reassign
                tipo = { ...sala_database, ...tipo };

                return this.query().upsert(tipo, sala_database)
                    .then((result) => {
                        if (result) {
                            return result;
                        }
                        return true;
                    });
            }
            throw 'Não foi possível atualizar a sala!';
        }

        return this.query().upsert(tipo)
            .then((result) => {
                if (result) {
                    return result;
                }
                return true;
            });
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

module.exports = Sala;
