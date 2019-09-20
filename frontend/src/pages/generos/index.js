import React, { useState, useEffect } from 'react';
import { Formik, Field } from 'formik';
import Page from '../../components/page';
import StyledTable from '../../components/styled-table';
import { Container, ContainerTable, ContainerEditor } from './style';
// import Input from '../../components/form-components/input';
import Input from '../../components/controlled-input';
import { ButtonGroup } from '../../components/button/styles';
import Button from '../../components/button';
import api from '../../services/api';


function Generos(props) {
    const [genero, setGenero] = useState({});
    const [updateTable, setUpdateTable] = useState(false);

    const initialValues = genero.id ? genero : {
        descricao: '',
    };

    useEffect(() => {
        if (updateTable) {
            setUpdateTable(false);
        }
    }, [updateTable]);

    const headers = [
        {
            name: 'Gênero',
            accessor: 'descricao',
            value: 'Gênero',
        },
    ];

    const makeForm = ({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
            <Field
                component={Input}
                name="descricao"
                placeholder="Gênero"
            />
            <ButtonGroup margin="21px 0 0 0">
                <Button label="Cancelar" kind="cancel" type="cancel" />
                <Button label="Salvar" kind="save" type="submit" />
            </ButtonGroup>
        </form>
    );

    return (
        <Page title="Gêneros">
            <Container>
                <ContainerTable>
                    <StyledTable
                        headers={headers}
                        fireFetch={updateTable}
                        // eslint-disable-next-line max-len
                        data_function={async ({ page, limit }) => await api.get('/generos', { params: { page, limit } })}
                        editFunction={({ original }) => {

                        }}
                        clickHandler={(state, rowInfo, column, instance) => {
                            if (column.name === 'edit') {
                                setGenero(rowInfo.original);
                            }

                            if (column.name === 'delete') {
                                console.log('delete');
                            }
                        }}
                        loading={false}
                    />
                </ContainerTable>
                <ContainerEditor>
                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        onSubmit={async (values, { setSubmitting, resetForm, ...rest }) => {
                            const genero_to_database = { ...values };
                            const res = await api.post('/generos', { genero: genero_to_database });

                            if (res.status === 200) {
                                resetForm();
                                setGenero({});
                                setUpdateTable(true);
                            }
                        }}
                    >
                        {makeForm}
                    </Formik>
                </ContainerEditor>
            </Container>
        </Page>
    );
}

export default Generos;
