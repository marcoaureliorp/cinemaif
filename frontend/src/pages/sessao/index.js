import React from 'react';
import { Formik, Field } from 'formik';
import Page from '../../components/page';
import { Container } from './styles';
import Input from '../../components/controlled-input';
import TimePicker from '../../components/form-components/time-picker/index';
import { ContainerEditor, ContainerTable } from '../generos/style';
import StyledTable from '../../components/styled-table';
import api from '../../services/api';
import {ButtonGroup} from "../../components/button/styles";
import Button from "../../components/button";


function Sessao(props) {
    const headers = [
        {
            name: 'Tipo',
            accessor: 'tipo',
            value: 'Tipo',
        },
        {
            name: 'Início',
            accessor: 'inicio',
            value: 'Início',
        },
        {
            name: 'Fim',
            accessor: 'fim',
            value: 'Fim',
        },
    ];

    function makeForm({ handleSubmit, values, ...rest }) {
        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name="sala"
                    id="sala"
                    margin="0 0 15px 0"
                    placeholder="Sala da sessão"
                    type="select"
                    component={Input}
                />
                <Field
                    name="tipo"
                    margin="0 0 15px 0"
                    id="tipo"
                    placeholder="Tipo da Sessão"
                    type="select"
                    component={Input}
                />
                <Field
                    name="preco"
                    margin="0 0 15px 0"
                    id="preco"
                    placeholder="Preço"
                    type="pricing"
                    component={Input}
                />
                <Field
                    name="inicio"
                    margin="0 0 15px 0"
                    ids="inicio"
                    type="time_picker"
                    component={Input}
                    placeholder="Início da sessão"
                />
                <Field
                    name="fim"
                    ids="fim"
                    margin="0 0 15px 0"
                    type="time_picker"
                    component={Input}
                    placeholder="Final da sessão"
                />
                <Field
                    name="dias"
                    id="dias"
                    placeholder="Dias da sessão"
                    type="multiple_date"
                    component={Input}
                />
                <ButtonGroup margin="21px 0 0 0">
                    <Button label="Cancelar" kind="cancel" type="cancel" />
                    <Button label="Salvar" kind="save" type="submit" />
                </ButtonGroup>
            </form>
        );
    }

    return (
        <Page title="Sessão">
            <Container>
                <ContainerTable>
                    <StyledTable
                        headers={headers}
                        // fireFetch={updateTable}
                        // eslint-disable-next-line max-len,no-return-await
                        data_function={async ({ page, limit }) => await api.get('/generos', { params: { page, limit } })}
                        editFunction={({ original }) => {

                        }}
                        clickHandler={async (state, rowInfo, column, instance) => {
                            if (column.name === 'edit') {
                            }

                            if (column.name === 'delete') {
                                const { id } = rowInfo.original;

                                const res = await api.delete('/generos', { params: { id } });

                                if (res.status === 204) {
                                }
                            }
                        }}
                        loading={false}
                    />
                </ContainerTable>
                <ContainerEditor>
                    <Formik
                        initialValues={{
                            inicio: ''
                        }}
                    >
                        {makeForm}
                    </Formik>
                </ContainerEditor>
            </Container>
        </Page>
    );
}

export default Sessao;
