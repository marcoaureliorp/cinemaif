import React from 'react';
import { Formik } from 'formik';
import Page from '../../components/page';
import StyledTable from '../../components/styled-table';
import { Container, ContainerTable, ContainerEditor } from './style';
import Input from '../../components/form-components/input';
import { ButtonGroup } from '../../components/button/styles';
import Button from '../../components/button';


function Generos(props) {
    const headers = [
        {
            name: 'Gênero',
            accessor: 'genero',
            value: 'Gênero',
        },
    ];

    const makeForm = ({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
            <Input
                name="genero"
                placeholder="Gênero"
            />
            <ButtonGroup margin="21px 0 0 0">
                <Button label="Cancelar" kind="cancel" />
                <Button label="Salvar" kind="save" />
            </ButtonGroup>
        </form>
    );

    return (
        <Page title="Gêneros">
            <Container>
                <ContainerTable>
                    <StyledTable
                        headers={headers}
                        data_function={() => {
                        }}
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
                <ContainerEditor>
                    <Formik>
                        {makeForm}
                    </Formik>
                </ContainerEditor>
            </Container>
        </Page>
    );
}

export default Generos;
