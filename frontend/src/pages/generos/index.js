import React from 'react';
import Page from '../../components/page';
import StyledTable from '../../components/styled-table';
import { ContainerTable } from './style';

function Generos(props) {
    const headers = [
        {
            name: 'Gênero',
            accessor: 'genero',
            value: 'Gênero',
        },
    ];

    return (
        <Page title="Gêneros">
            <ContainerTable>
                <StyledTable
                    headers={headers}
                    data_function={() => {}}
                    data={[
                        {
                            genero: 'Ação',
                        },
                    ]}
                    // data_function={}
                    clickHandler={(state, rowInfo, column, instance) => {
                        // if (props.history && rowInfo.original) {
                        //     props.history.push(`/filial/${rowInfo.original.id}`);
                        // }
                    }}
                    loading={false}
                />
            </ContainerTable>
        </Page>
    );
}

export default Generos;
