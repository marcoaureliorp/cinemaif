import React, { useState, useEffect } from 'react';
import { Formik, Field } from 'formik';
import Page from '../../components/page';
import StyledTable from '../../components/styled-table';
import { Container, ContainerTable, ContainerEditor } from './style';
import Input from '../../components/controlled-input';
import { ButtonGroup } from '../../components/button/styles';
import Button from '../../components/button';
import api from '../../services/api';


function Sala(props) {
    const [sala, setSala] = useState({});
    const [updateTable, setUpdateTable] = useState(false);

    const initialValues = sala.id ? sala : {
        cadeiras: '', numero: '',
    };

    useEffect(() => {
        if (updateTable) {
            setUpdateTable(false);
        }
    }, [updateTable]);

    const headers = [
        {
            name: 'Cadeiras',
            accessor: 'cadeiras',
            value: 'Cadeiras',
        },
        {
            name: 'Número',
            accessor: 'numero',
            value: 'Número',
        },
    ];

    // eslint-disable-next-line react/prop-types
    const makeForm = ({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
            <Field
                component={Input}
                name="cadeiras"
                placeholder="Cadeiras"
                margin="0 0 19px 0"
            />
            <Field
                component={Input}
                name="numero"
                placeholder="Número"
            />
            <ButtonGroup margin="21px 0 0 0">
                <Button label="Cancelar" kind="cancel" type="cancel" />
                <Button label="Salvar" kind="save" type="submit" />
            </ButtonGroup>
        </form>
    );

    return (
        <Page title="Salas">
            <Container>
                <ContainerTable>
                    <StyledTable
                        headers={headers}
                        fireFetch={updateTable}
                        // eslint-disable-next-line max-len,no-return-await
                        data_function={async ({ page, limit }) => await api.get('/salas', { params: { page, limit } })}
                        editFunction={({ original }) => {

                        }}
                        clickHandler={async (state, rowInfo, column, instance) => {
                            if (column.name === 'edit') {
                                setSala(rowInfo.original);
                            }

                            if (column.name === 'delete') {
                                const { id } = rowInfo.original;

                                const res = await api.delete('/salas', { params: { id } });

                                if (res.status === 204) {
                                    setUpdateTable(true);
                                }
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
                            const sala_to_database = { ...values };
                            const res = await api.post('/salas', { sala: sala_to_database });

                            if (res.status === 200) {
                                resetForm();
                                setSala({});
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

export default Sala;
