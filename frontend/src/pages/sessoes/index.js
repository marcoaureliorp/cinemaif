import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
    Container, ContainerTable, Row, Exportar,
} from './style';
import Page from '../../components/page';
import Select from '../../components/form-components/select';

import api from '../../services/api';
import StyledTable from '../../components/styled-table';
import { parser } from '../../util/styled-components/select-parser';
import TimePicker from '../../components/form-components/time-picker';

function Sessoes(props) {
    const [updateTable, setUpdateTable] = useState(false);
    const filme_id = Number(props.match.params.id) || null;
    const [arrayTipos, setArrayTipos] = useState([]);
    const [filtros, setFiltros] = useState({
        tipo: '',
        inicio: null,
        fim: null,
    });

    useEffect(() => {
        if (updateTable) {
            setUpdateTable(false);
        }
    }, [updateTable]);

    useEffect(() => {
        async function getInfoSelects() {
            const result_tipos = await api.get('/tipos');
            if (result_tipos.data.results) {
                const formatedTipos = parser('descricao', 'id', result_tipos.data.results);
                setArrayTipos(formatedTipos);
            }
        }

        getInfoSelects();
    }, []);

    async function getSessoes({ page, limit, ...props }) {
        const result = await api.get('sessoes', {
            params: {
                filme: filme_id,
                ...filtros,
                page,
                limit,
            },
        });

        return result;
    }

    const headers = [
        {
            name: 'Filme',
            accessor: 'filme.titulo',
            value: 'Tipo',
        },
        {
            name: 'Tipo',
            accessor: 'tipo.descricao',
            value: 'Tipo',
        },
        {
            name: 'Início',
            accessor: 'inicio_sessao',
            value: 'Início',
            Cell: (props) => {
                const value = moment(props.value, 'HH:mm:ss');
                return (<div>{value.format('HH:mm:ss')}</div>);
            },
        },
        {
            name: 'Fim',
            accessor: 'final_sessao',
            value: 'Fim',
            Cell: (props) => {
                const value = moment(props.value, 'HH:mm:ss');
                return (<div>{value.format('HH:mm:ss')}</div>);
            },
        },
    ];

    return (
        <Page
            title="Sessões"
            history={props.history}
        >
            <Container>
                <Row>
                    <Select
                        name="tipo"
                        margin="0 20px 0 0"
                        onChange={(value) => {
                            setFiltros({ ...filtros, tipo: value && value.value ? value.value : null });
                            setUpdateTable(true);
                        }}
                        isClearable
                        options={arrayTipos}
                    />
                    <TimePicker
                        name="inicio"
                        margin="0 20px 0 0"
                        placeholder="Início da sessão"
                        autoComplete="off"
                        onChange={(value) => {
                            const inicio = moment(value._d).format('HH:mm:00');
                            setFiltros({ ...filtros, inicio });
                            setUpdateTable(true);
                        }}
                    />
                    <TimePicker
                        name="fim"
                        margin="0 20px 0 0"
                        placeholder="Final da sessão"
                        autoComplete="off"
                        onChange={(value) => {
                            const fim = moment(value._d).format('HH:mm:00');
                            setFiltros({ ...filtros, fim });
                            setUpdateTable(true);
                        }}
                    />
                    <Exportar onClick={() => {
                        async function exportar() {
                            const result = await api.get('sessoes/exportar', {
                                params: {
                                    filme: filme_id,
                                    ...filtros,
                                },
                            });

                            window.open(`${api.defaults.baseURL}uploads/${result.data}`);
                        }

                        exportar();
                    }}
                    >
Exportar
                    </Exportar>
                </Row>
                <ContainerTable>
                    <StyledTable
                        headers={headers}
                        fireFetch={updateTable}
                        // eslint-disable-next-line max-len,no-return-await
                        data_function={getSessoes}
                        editFunction={({ original }) => {}}
                        clickHandler={async (state, rowInfo, column, instance) => {}}
                        loading={false}
                        hideHandleColumns
                    />
                </ContainerTable>
            </Container>
        </Page>
    );
}

export default Sessoes;
