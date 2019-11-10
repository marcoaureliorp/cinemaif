const path = require('path');
const { BaseModel } = require('../../database/base-model');

class Tipo extends BaseModel {
    static get tableName() {
        return 'tipo';
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
                descricao: { type: 'string', minLength: 1, maxLength: 255 },
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
    //                 from: 'tipo.id',
    //                 through: {
    //                     from: 'filiais_funcionarios.tipo',
    //                     to: 'filiais_funcionarios.funcionario',
    //                 },
    //                 to: 'funcionarios.id',
    //             },
    //         },
    //         filial_cargo: {
    //             relation: BaseModel.ManyToManyRelation,
    //             modelClass: Filiais,
    //             join: {
    //                 from: 'tipo.id',
    //                 through: {
    //                     from: 'filiais_funcionarios.tipo',
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
    //                 from: 'tipo.id',
    //                 to: 'system_logs.referencia',
    //             },
    //         },
    //         updated: {
    //             relation: BaseModel.BelongsToOneRelation,
    //             modelClass: SystemLogs,
    //             join: {
    //                 from: 'tipo.id',
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
        //             [inserted(tipo, onlyInsert).funcionario(withOutPass),
        //             updated(tipo, lastUpdate).funcionario(withOutPass)]
        //         `);

        if (id !== 0) {
            query.where('tipo.id', id);
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

    static async save(tipo) {
        if (tipo.id) {
            const genero_database = await this.query().select('*').where('id', tipo.id).first();
            if (genero_database && genero_database.id) {
                // eslint-disable-next-line no-param-reassign
                tipo = { ...genero_database, ...tipo };

                return this.query().upsert(tipo, genero_database)
                    .then((result) => {
                        if (result) {
                            return result;
                        }
                        return true;
                    });
            }
            throw 'Não foi possível atualizar tipo!';
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
        const tipo = await this.query().select('*').where('tipo.id', id)
            .first();

        if (tipo && tipo.id) {
            return this.query().delete().where('id', tipo.id)
                .then();
        }
        throw 'Não foi possível excluir tipo!';
    }
}

module.exports = Tipo;
