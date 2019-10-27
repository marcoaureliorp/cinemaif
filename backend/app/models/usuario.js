const path = require('path');
const { BaseModel } = require('../../database/base-model');

class Usuario extends BaseModel {
    static get tableName() {
        return 'usuario';
    }

    static get idColumn() {
        return 'id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['login', 'senha', 'data_nascimento'],
            properties: {
                id: { type: 'integer' },
                login: { type: 'string', minLength: 1, maxLength: 240 },
                senha: { type: 'string', minLength: 6, maxLength: 240 },
                data_nascimento: { type: 'date', format: 'date' },
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
            query.where('usuario.id', id);
        }

        if (search !== null) {
            query.where('login', 'like', `%${search}%`);
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

    static async login({
        login,
        senha,
    }) {
        const query = this.query().select();

        query.where('login', '=', `${login}`)
            .andWhere('senha', '=', `${senha}`);

        const results = await query.then();

        const total = await query.groupBy('id').resultSize();

        return {
            results,
            total,
        };
    }

    static async save(usuario) {
        if (usuario.id) {
            const usuario_database = await this.query().select('*').where('id', usuario.id).first();
            if (usuario_database && usuario_database.id) {
                // eslint-disable-next-line no-param-reassign
                usuario = { ...usuario_database, ...usuario };

                return this.query().upsert(usuario, usuario_database)
                    .then((result) => {
                        if (result) {
                            return result;
                        }
                        return true;
                    });
            }
            throw 'Não foi possível atualizar usuário!';
        }

        return this.query().upsert(usuario)
            .then((result) => {
                if (result) {
                    return result;
                }
                return true;
            });
    }

    static async softDelete({ id }) {
        const usuario = await this.query().select('*').where('usuario.id', id)
            .first();

        if (usuario && usuario.id) {
            return this.query().delete().where('id', usuario.id)
                .then();
        }
        throw 'Não foi possível excluir usuário!';
    }
}

module.exports = Usuario;
