const path = require('path');
const { BaseModel } = require('../../database/base-model');

class Filme extends BaseModel {
    static get tableName() {
        return 'filme';
    }

    static get idColumn() {
        return 'id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['titulo'],
            properties: {
                id: { type: 'integer' },
                titulo: { type: 'string', minLength: 1, maxLength: 240 },
                sinopse: { type: 'string' },
                duracao: { type: 'string', minLength: 1, maxLength: 5 },
                classificacao: { type: 'string', minLength: 1, maxLength: 2 },
                capa: { type: 'string' },
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
    //                 from: 'filme.id',
    //                 through: {
    //                     from: 'filiais_funcionarios.filme',
    //                     to: 'filiais_funcionarios.funcionario',
    //                 },
    //                 to: 'funcionarios.id',
    //             },
    //         },
    //         filial_cargo: {
    //             relation: BaseModel.ManyToManyRelation,
    //             modelClass: Filiais,
    //             join: {
    //                 from: 'filme.id',
    //                 through: {
    //                     from: 'filiais_funcionarios.filme',
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
    //                 from: 'filme.id',
    //                 to: 'system_logs.referencia',
    //             },
    //         },
    //         updated: {
    //             relation: BaseModel.BelongsToOneRelation,
    //             modelClass: SystemLogs,
    //             join: {
    //                 from: 'filme.id',
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
        //             [inserted(filme, onlyInsert).funcionario(withOutPass),
        //             updated(filme, lastUpdate).funcionario(withOutPass)]
        //         `);

        if (id !== 0) {
            query.where('filme.id', id);
        }

        if (search !== null) {
            query.where('titulo', 'like', `%${search}%`);
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

    static async save(filme) {
        if (filme.id) {
            const filme_database = await this.query().select('*').where('id', filme.id).first();
            if (filme_database && filme_database.id) {
                // eslint-disable-next-line no-param-reassign
                filme = { ...filme_database, ...filme };

                return this.query().upsert(filme, filme_database)
                    .then((result) => {
                        if (result) {
                            return result;
                        }
                        return true;
                    });
            }
            throw 'Não foi possível atualizar filme!';
        }

        return this.query().upsert(filme)
            .then((result) => {
                if (result) {
                    return result;
                }
                return true;
            });
    }

    static async softDelete({ id }) {
        const filme = await this.query().select('*').where('filme.id', id)
            .first();

        if (filme && filme.id) {
            return this.query().delete().where('id', filme.id)
                .then();
        }
        throw 'Não foi possível excluir filme!';
    }
}

module.exports = Filme;
