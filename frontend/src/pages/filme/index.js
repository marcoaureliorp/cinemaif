import React, { useState, useEffect } from 'react';
import { Formik, Field } from 'formik';
import Moment from 'moment';
import Page from '../../components/page';
import {
    Container, ContainerPreview, ContainerEditor, FilmePreview, Left, Title, Gender, Duration, Right,
} from './style';
import Input from '../../components/form-components/input';
import ControlledInput from '../../components/controlled-input';
import { ButtonGroup } from '../../components/button/styles';
import Button from '../../components/button';
import Classificacao from '../../components/classificacao';
import ControlledUploadFile from '../../components/controlled-upload-file';

import api from '../../services/api';
import { colors } from '../../config/theme';
import { parser } from '../../util/styled-components/select-parser';

function Filme(props) {
    const [titulo, setTitulo] = useState('Titulo do Filme');
    const [arrayClassificacao, setArrayClassificacao] = useState([]);
    const [arrayGeneros, setArrayGeneros] = useState([]);
    const [sinopse, setSinopse] = useState('Sinopse');

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

    let listaGeneros = ['Gêneros'];

    async function getGeneros() {
        const res = await api.get('/generos');
        if (res.status === 200) {
            const options = parser('descricao', 'id', res.data.results);
            setArrayGeneros(options);
        }
    }

    useEffect(() => {
        getGeneros().then();

        const optionsClassificacao = parser('name', 'id', classificacaoBackgroundList);
        setArrayClassificacao(optionsClassificacao);
    }, []);

    const makeForm = ({ handleSubmit, values, ...rest }) => {
        console.log(values);
        return (
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
                                    name="foto"
                                    margin="calc(-37px / 2) 0 0 0"
                                    component={ControlledUploadFile}
                                />
                                <Title>{values.titulo !== '' ? values.titulo : 'Título'}</Title>
                                <Gender>{listaGeneros.length > 0 ? listaGeneros.join(', ') : 'Gêneros'}</Gender>
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
                            onChange={(value) => {
                                if (value !== null) {
                                    listaGeneros = [];
                                    listaGeneros.push(value.map(item => item.label));
                                } else {
                                    listaGeneros = ['Gêneros'];
                                }
                            }}
                        />
                        <Field
                            name="sinopse"
                            margin="0 0 19px 0"
                            height="375px"
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
    };

    return (
        <Page title="Cadastro de Filmes">
            <Formik
                initialValues={{
                    classificacao: '', generos: [], duracao: null, titulo: '', foto: '', sinopse: '',
                }}
                onSubmit={async (values, { setSubmitting, resetForm, ...rest }) => {
                    const filme_to_database = { ...values };
                    console.log('dados', filme_to_database);
                    // const res = await api.post('/filmes', { filme: filme_to_database });

                    // if (res.status === 200) {
                    //     resetForm();
                    // }
                }}
            >
                {makeForm}
            </Formik>
        </Page>
    );
}

export default Filme;
