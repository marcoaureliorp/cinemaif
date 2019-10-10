import React, { useEffect, useState } from 'react';
import { Formik, Field } from 'formik';
import moment from 'moment';
import Page from '../../components/page';
import { Container } from './styles';
import Input from '../../components/controlled-input';
import { ContainerEditor, ContainerTable } from '../generos/style';
import StyledTable from '../../components/styled-table';
import api from '../../services/api';
import { ButtonGroup } from '../../components/button/styles';
import Button from '../../components/button';
import { parser } from '../../util/styled-components/select-parser';


function Sessao(props) {
    const [tipos, setTipos] = useState([]);
    const [salas, setSalas] = useState([]);

    useEffect(() => {
        async function getInfoSelects() {
            const result_tipos = await api.get('/tipos');
            if (result_tipos.data.results) {
                const formatedTipos = parser('descricao', 'id', result_tipos.data.results);
                setTipos(formatedTipos);
            }
            const result_salas = await api.get('/salas');
            if (result_salas.data.results) {
                const formatedSalas = parser('numero', 'id', result_salas.data.results);
                setSalas(formatedSalas);
            }
        }

        getInfoSelects();
    }, []);


    async function getSessoes({ page, limit }) {
        const result = await api.get('sessoes', {
            params: {
                filme: 1,
                page,
                limit,
            },
        });

        console.log(result.data);

        return result;
    }

    const headers = [
        {
            name: 'Tipo',
            accessor: 'tipo.descricao',
            value: 'Tipo',
        },
        {
            name: 'Sala',
            accessor: 'sala.numero',
            value: 'Sala',
        },
        {
            name: 'Início',
            accessor: 'inicio_sessao',
            value: 'Início',
            Cell: (props) => {
                const value = moment(props.value, 'DD/MM/YYYY HH:mm:ss');
                return (<div>{value.format('HH:mm:ss')}</div>);
            },
        },
        {
            name: 'Fim',
            accessor: 'final_sessao',
            value: 'Fim',
            Cell: (props) => {
                const value = moment(props.value, 'DD/MM/YYYY HH:mm:ss');
                return (<div>{value.format('HH:mm:ss')}</div>);
            },
        },
    ];

    function makeForm({ handleSubmit, values, ...rest }) {
        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name="dias"
                    id="dias"
                    margin="0 0 15px 0"
                    placeholder="Dias da sessão"
                    type="multiple_date"
                    component={Input}
                />
                <Field
                    name="sala"
                    id="sala"
                    margin="0 0 15px 0"
                    placeholder="Sala da sessão"
                    options={salas}
                    type="select"
                    component={Input}
                />
                <Field
                    name="tipo"
                    margin="0 0 15px 0"
                    id="tipo"
                    placeholder="Tipo da Sessão"
                    type="select"
                    options={tipos}
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
                    type="time_picker"
                    component={Input}
                    placeholder="Final da sessão"
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
                        data_function={getSessoes}
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
                            inicio: null,
                            fim: null,
                            dias: [],
                            sala: '',
                            tipo: '',
                            preco: '',
                        }}
                        onSubmit={(values) => {
                            const sessoes_to_save = values.dias.map((day) => {
                                const new_day = moment(day).format('DD/MM/YYYY');
                                const inicio = moment(values.inicio._d).format('HH:mm:00');
                                const final = moment(values.inicio._d).format('HH:mm:00');

                                const new_inicio = `${new_day} ${inicio}`;
                                const new_final = `${new_day} ${final}`;

                                return {
                                    inicio: new_inicio,
                                    fim: new_final,
                                    preco: values.preco,
                                    tipo_id: values.tipo.value,
                                    sala_id: values.sala.value,
                                    filme_id: 1,
                                };
                            });

                            async function save(sessoes) {
                                const result = await api.post('sessoes', {
                                    params: {
                                        sessoes,
                                    },
                                });
                                console.log(result);
                            }

                            save(sessoes_to_save);
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
