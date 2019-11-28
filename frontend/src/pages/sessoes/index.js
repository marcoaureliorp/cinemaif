import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Container, ContainerTable } from './style';
import Page from '../../components/page';

import api from '../../services/api';
import StyledTable from '../../components/styled-table';

function Sessoes(props) {
    const [updateTable, setUpdateTable] = useState(false);
    const filme_id = Number(props.match.params.id) || null;

    useEffect(() => {
        if (updateTable) {
            setUpdateTable(false);
        }
    }, [updateTable]);

    async function getSessoes({ page, limit, ...props }) {
        const result = await api.get('sessoes', {
            params: {
                filme: filme_id,
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
                <div onClick={() => {
                    async function exportar() {
                        const result = await api.get('sessoes/exportar', {
                            params: {
                                filme: filme_id,
                            },
                        });

                        window.open(`${api.defaults.baseURL}uploads/${result.data}`);
                    }

                    exportar();
                }}
                >
Exportar
                </div>
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
