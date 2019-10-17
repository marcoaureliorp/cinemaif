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
    const [sessao, setSessao] = useState({});
    const [updateTable, setUpdateTable] = useState(false);
    const filme_id = Number(props.match.params.id) || null;

    const initialValues = sessao.id ? sessao : {
        inicio_sessao: null,
        final_sessao: null,
        dias: '',
        sala: '',
        tipo: '',
        valor: '',
    };

    useEffect(() => {
        if (!filme_id) {
            props.history.push('/');
        }
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
                filme: filme_id,
                page,
                limit,
            },
        });

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

    function makeForm({ handleSubmit, values, ...rest }) {
        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name="dias"
                    id="dias"
                    margin="0 0 15px 0"
                    placeholder="Dias da sessão"
                    type="date_range"
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
                    name="valor"
                    margin="0 0 15px 0"
                    id="valor"
                    placeholder="Preço"
                    type="pricing"
                    component={Input}
                />
                <Field
                    name="inicio_sessao"
                    margin="0 0 15px 0"
                    id="inicio_sessao"
                    type="time_picker"
                    component={Input}
                    placeholder="Início da sessão"
                />
                <Field
                    name="final_sessao"
                    id="final_sessao"
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

    function setSessaoEdit(data) {
        const dias = [moment(data.dia_inicio, 'DD/MM/YYYY').toDate(), moment(data.dia_fim, 'DD/MM/YYYY').toDate()];
        const inicio_sessao = moment(data.inicio_sessao, 'HH:mm:ss');
        const final_sessao = moment(data.final_sessao, 'HH:mm:ss');

        const tipo = { label: data.tipo.descricao, value: data.tipo.id };
        const sala = { label: data.sala.numero, value: data.sala.id };

        setSessao({
            id: data.id,
            valor: data.valor,
            dias,
            inicio_sessao,
            final_sessao,
            tipo,
            sala,
        });
    }

    return (
        <Page title="Sessão">
            <Container>
                <ContainerTable>
                    <StyledTable
                        headers={headers}
                        fireFetch={updateTable}
                        // eslint-disable-next-line max-len,no-return-await
                        data_function={getSessoes}
                        editFunction={({ original }) => {

                        }}
                        clickHandler={async (state, rowInfo, column, instance) => {
                            if (column.name === 'edit') {
                                setSessaoEdit(rowInfo.original);
                            }

                            if (column.name === 'delete') {
                                const { id } = rowInfo.original;

                                const res = await api.delete('/sessoes', { params: { id } });

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
                        onSubmit={(values, { resetForm }) => {
                            const inicio_sessao = moment(values.inicio_sessao._d).format('HH:mm:00');
                            const final_sessao = moment(values.final_sessao._d).format('HH:mm:00');

                            const dia_inicio = moment(values.dias[0]).format('DD/MM/YYYY');
                            const dia_fim = moment(values.dias[1]).format('DD/MM/YYYY');

                            const sessoes_to_save = {
                                inicio_sessao,
                                final_sessao,
                                valor: values.valor,
                                tipo_id: values.tipo.value,
                                sala_id: values.sala.value,
                                filme_id,
                                dia_inicio,
                                dia_fim,
                            };

                            if (values.id) {
                                sessoes_to_save.id = values.id;
                            }

                            async function save(sessoes) {
                                const result = await api.post('sessoes', {
                                    sessoes,
                                });

                                if (result.status === 200) {
                                    resetForm();
                                    setSessao({});
                                    setUpdateTable(true);
                                }
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
