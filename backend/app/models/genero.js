const path = require('path');
const { BaseModel } = require('../../database/base-model');

class Genero extends BaseModel {
    static get tableName() {
        return 'genero';
    }

    static get idColumn() {
        return 'id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['descricao'],
            properties: {
                id: { type: 'integer' },
                descricao: { type: 'string', minLength: 1, maxLength: 240 },
            },
        };
    }

    // static get relationMappings() {
    //     /* eslint import/no-dynamic-require: 0 */
    //     const FiliaisFuncionarios = require(path.resolve(this.modelPaths, 'filiais-funcionarios.js'));
    //     const Filiais = require(path.resolve(this.modelPaths, 'filiais.js'));
    //     const SystemLogs = require(path.resolve(this.modelPaths, 'system-logs.js'));
    //
    //     return {
    //         funcionario_cargos: {
    //             relation: BaseModel.ManyToManyRelation,
    //             modelClass: FiliaisFuncionarios,
    //             join: {
    //                 from: 'genero.id',
    //                 through: {
    //                     from: 'filiais_funcionarios.genero',
    //                     to: 'filiais_funcionarios.funcionario',
    //                 },
    //                 to: 'funcionarios.id',
    //             },
    //         },
    //         filial_cargo: {
    //             relation: BaseModel.ManyToManyRelation,
    //             modelClass: Filiais,
    //             join: {
    //                 from: 'genero.id',
    //                 through: {
    //                     from: 'filiais_funcionarios.genero',
    //                     to: 'filiais_funcionarios.filial',
    //                 },
    //                 to: 'filiais.id',
    //             },
    //         },
    //         system_logs: {
    //             relation: BaseModel.HasManyRelation,
    //             modelClass: SystemLogs,
    //             join: {
    //                 from: 'feedbacks.id',
    //                 to: 'system_logs.referencia',
    //             },
    //         },
    //         inserted: {
    //             relation: BaseModel.BelongsToOneRelation,
    //             modelClass: SystemLogs,
    //             join: {
    //                 from: 'genero.id',
    //                 to: 'system_logs.referencia',
    //             },
    //         },
    //         updated: {
    //             relation: BaseModel.BelongsToOneRelation,
    //             modelClass: SystemLogs,
    //             join: {
    //                 from: 'genero.id',
    //                 to: 'system_logs.referencia',
    //             },
    //         },
    //     };
    // }

    static async get({
        id,
        limit,
        search,
        page,
    }) {
        const query = this.query().select();

        // query.eagerAlgorithm(this.JoinEagerAlgorithm)
        //     .eager(`
        //             [inserted(genero, onlyInsert).funcionario(withOutPass),
        //             updated(genero, lastUpdate).funcionario(withOutPass)]
        //         `);

        if (id !== 0) {
            query.where('genero.id', id);
        }

        if (search !== null) {
            query.where('descricao', 'like', `%${search}%`);
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

    static async save(genero) {
        if (genero.id) {
            const genero_database = await this.query().select('*').where('id', genero.id).first();
            if (genero_database && genero_database.id) {
                // eslint-disable-next-line no-param-reassign
                genero = { ...genero_database, ...genero };

                return this.query().upsert(genero, genero_database)
                    .then((result) => {
                        if (result) {
                            return result;
                        }
                        return true;
                    });
            }
            throw 'Não foi possível atualizar genero!';
        }

        return this.query().upsert(genero)
            .then((result) => {
                if (result) {
                    return result;
                }
                return true;
            });
    }

    static async softDelete({ id }) {
        const genero = await this.query().select('*').where('genero.id', id)
            .first();

        // if (genero && genero.id) {
        //     genero.desativado = 1;
        //     this.query().soft(genero)
        //         .then();
        // }
        throw 'Não foi possível excluir genero!';
    }
}

module.exports = Genero;
