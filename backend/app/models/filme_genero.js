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

        const results = await query.then();

        const total = await query.groupBy('filme_id').resultSize();

        return {
            results,
            total,
        };
    }

    static async save(filme_genero) {
        console.log(filme_genero);
        // if (filme_genero.filme_id) {
        //     const filme_genero_database = await this.query().select('*').where('filme_id', filme_genero.filme_id).first();
        //     if (filme_genero_database && filme_genero_database.filme_id) {
        //         // eslint-disable-next-line no-param-reassign
        //         filme_genero = { ...filme_genero_database, ...filme_genero };
        //
        //         return this.query().upsert(filme_genero, filme_genero_database)
        //             .then((result) => {
        //                 if (result) {
        //                     return result;
        //                 }
        //                 return true;
        //             });
        //     }
        //     throw 'Não foi possível atualizar filme gênero!';
        // }

        return this.query().upsert(filme_genero)
            .then((result) => {
                if (result) {
                    return result;
                }
                return true;
            });
    }

    static async softDelete({ id }) {
        const filme = await this.query().select('*').where('filme_genero.filme_id', id)
            .first();

        if (filme && filme.filme_id) {
            return this.query().delete().where('filme_id', filme.filme_id)
                .then();
        }
        throw 'Não foi possível excluir filme gênero!';
    }
}

module.exports = FilmeGenero;
