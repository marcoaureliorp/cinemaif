const path = require('path');
const { BaseModel } = require('../../database/base-model');

class FilmeGenero extends BaseModel {
    static get tableName() {
        return 'filme_genero';
    }

    static get idColumn() {
        return 'id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['filme_id', 'genero_id'],
            properties: {
                filme_id: { type: 'integer' },
                genero_id: { type: 'integer' },
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

        const results = await query.then();

        const total = await query.groupBy('filme_id').resultSize();

        return {
            results,
            total,
        };
    }

    static async save(filme_id, filme_genero) {
        this.softDelete(filme_id);

        const insertGeneros = genero => new Promise(async (resolve, reject) => {
            try {
                const result = this.query().insert(genero)
                    .then((res) => {
                        if (res) {
                            return res;
                        }
                        return true;
                    });
                resolve(result);
            } catch (e) {
                reject(e);
            }
        });

        if (filme_genero.length > 0) {
            // eslint-disable-next-line max-len
            const insert_generos = await Promise.all(filme_genero.map(item => insertGeneros(item)));
            return insert_generos.every(item => item.id === 0);
        }
        return true;
    }

    static async softDelete(id) {
        return this.query().delete().where('filme_id', id)
            .then();
    }
}

module.exports = FilmeGenero;
