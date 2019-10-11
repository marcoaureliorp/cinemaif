import React, { useState, useEffect } from 'react';
import { Formik, Field } from 'formik';
import Moment from 'moment';
import Page from '../../components/page';
import {
    Container, ContainerPreview, ContainerEditor, FilmePreview, Left, Title, Gender, Duration, Right,
} from './style';
import ControlledInput from '../../components/controlled-input';
import { ButtonGroup } from '../../components/button/styles';
import Button from '../../components/button';
import Classificacao from '../../components/classificacao';
import ControlledUploadFile from '../../components/controlled-upload-file';

import api from '../../services/api';
import { colors } from '../../config/theme';
import { parser } from '../../util/styled-components/select-parser';

function Filme(props) {
    const [arrayClassificacao, setArrayClassificacao] = useState([]);
    const [arrayGeneros, setArrayGeneros] = useState([]);
    const [filme, setFilme] = useState({});

    const classificacaoBackgroundList = [
        {
            id: 'L', name: 'Livre', backgroundColor: '#00B150', border: 'none',
        },
        {
            id: '10', name: '10 anos', backgroundColor: '#00CDFF', border: 'none',
        },
        {
            id: '12', name: '12 anos', backgroundColor: '#FFCC00', border: 'none',
        },
        {
            id: '14', name: '14 anos', backgroundColor: '#FF6600', border: 'none',
        },
        {
            id: '16', name: '16 anos', backgroundColor: '#F60000', border: 'none',
        },
        {
            id: '18', name: '18 anos', backgroundColor: '#000000', border: 'none',
        },
    ];

    const initial_values = filme.id ? filme : {
        classificacao: '', generos: [], duracao: null, titulo: '', capa: '', sinopse: '',
    };

    useEffect(() => {
        async function getGeneros() {
            const res = await api.get('/generos');
            if (res.status === 200) {
                const options = parser('descricao', 'id', res.data.results);
                setArrayGeneros(options);
            }
        }

        getGeneros().then();

        const optionsClassificacao = parser('name', 'id', classificacaoBackgroundList);
        setArrayClassificacao(optionsClassificacao);
    }, []);

    useEffect(() => {
        async function getFilme() {
            const res = await api.get(`/filmes/${props.match.params.id}`);

            if (res.status === 200) {
                const dados = res.data;

                dados.duracao = Moment(dados.duracao, 'HH:mm:ss');
                const get_classificacao = classificacaoBackgroundList.find(item => item.id === dados.classificacao);
                dados.classificacao = { label: get_classificacao.name, value: get_classificacao.id };

                dados.generos = dados.generos.map(item => ({ label: item.descricao, value: item.id }));

                setFilme(dados);
            }
        }

        if (props.match.params.id) {
            getFilme().then();
        }
    }, [props.match.params.id]);

    const makeForm = ({ handleSubmit, values, ...rest }) => (
        <form onSubmit={handleSubmit}>
            <Container>
                <ContainerPreview>
                    <FilmePreview>
                        <Left>
                            <Classificacao
                                classificacao={values.classificacao !== '' && values.classificacao !== null
                                    ? classificacaoBackgroundList.filter(item => item.id === values.classificacao.value)[0].id
                                    : ''
                                }
                                background={values.classificacao !== '' && values.classificacao !== null
                                    ? classificacaoBackgroundList.filter(item => item.id === values.classificacao.value)[0].backgroundColor
                                    : 'transparent'
                                }
                                border={values.classificacao !== '' && values.classificacao !== null
                                    ? classificacaoBackgroundList.filter(item => item.id === values.classificacao.value)[0].border
                                    : '2px solid white'
                                }
                                width={65}
                                z_index={2}
                                color={colors.white}
                            />
                            <Field
                                name="capa"
                                margin="calc(-37px / 2) 0 0 0"
                                component={ControlledUploadFile}
                            />
                            <Title>{values.titulo !== '' ? values.titulo : 'Título'}</Title>
                            <Gender>{values.generos.length > 0 ? values.generos.map(item => item.label).join(', ') : 'Gêneros'}</Gender>
                            <Duration>{values.duracao && values.duracao._d ? Moment(values.duracao._d).format('HH:mm') : 'Duração'}</Duration>
                        </Left>
                        <Right>{values.sinopse !== '' ? values.sinopse : 'Sinopse'}</Right>
                    </FilmePreview>
                </ContainerPreview>
                <ContainerEditor>
                    <Field
                        name="titulo"
                        margin="0 0 19px 0"
                        placeholder="Título do filme"
                        component={ControlledInput}
                    />
                    <Field
                        name="duracao"
                        id="duracao"
                        margin="0 0 19px 0"
                        placeholder="Duração do filme"
                        type="time_picker"
                        component={ControlledInput}
                    />
                    <Field
                        name="classificacao"
                        margin="0 0 19px 0"
                        type="select"
                        placeholder="Classificação do filme"
                        component={ControlledInput}
                        options={arrayClassificacao}
                    />
                    <Field
                        name="generos"
                        type="select"
                        placeholder="Gêneros do filme"
                        margin="0 0 19px 0"
                        component={ControlledInput}
                        options={arrayGeneros}
                        isMulti
                    />
                    <Field
                        name="sinopse"
                        margin="0 0 19px 0"
                        height="375px"
                        as="textarea"
                        placeholder="Sinopse do filme"
                        component={ControlledInput}
                    />
                    <ButtonGroup>
                        <Button kind="cancel" label="Cancelar" />
                        <Button kind="save" label="Salvar" />
                    </ButtonGroup>
                </ContainerEditor>
            </Container>
        </form>
    );

    return (
        <Page title="Cadastro de Filmes">
            <Formik
                enableReinitialize
                initialValues={initial_values}
                onSubmit={async (values, { setSubmitting, resetForm, ...rest }) => {
                    const filme_to_database = { ...values };
                    const data = new FormData();

                    filme_to_database.classificacao = filme_to_database.classificacao.value;

                    const generos = filme_to_database.generos.map(item => item.value);
                    delete filme_to_database.generos;

                    filme_to_database.duracao = Moment(filme_to_database.duracao).format('HH:mm');

                    Object.keys(filme_to_database).forEach((value, index) => {
                        const index_value = filme_to_database[value];

                        if (index_value instanceof File) {
                            data.append(value, index_value);
                        } else {
                            data.set(value, index_value);
                        }
                    });

                    const res = await api.post('/filmes', data);

                    if (res.status === 200) {
                        const lista_generos = generos.map(item => ({ filme_id: res.data.id || filme.id, genero_id: item }));
                        const resolve = await api.post('/filmes_generos', { filme_id: res.data.id || filme.id, filme_genero: lista_generos });

                        if (res.data.id) {
                            props.history.push(`/filme/${res.data.id}`);
                        }
                    }
                }}
            >
                {makeForm}
            </Formik>
        </Page>
    );
}

export default Filme;
