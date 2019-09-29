import React, { useState, useEffect } from 'react';
import { Formik, Field } from 'formik';
import { Container, ContainerEditor } from './style';
import Input from '../../components/controlled-input';
import Button from '../../components/button';
import api from '../../services/api';


function Login(props) {
    // eslint-disable-next-line react/prop-types
    const makeForm = ({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
            <Field
                component={Input}
                name="login"
                margin="0 0 19px 0"
                placeholder="Login"
            />
            <Field
                component={Input}
                name="senha"
                type="password"
                margin="0 0 19px 0"
                placeholder="Senha"
            />
            <Button label="Salvar" kind="save" width="100%" type="submit" />
        </form>
    );

    return (
        <Container>
            <ContainerEditor>
                <Formik
                    enableReinitialize
                    onSubmit={async (values, { setSubmitting, resetForm, ...rest }) => {
                        const login_to_database = { ...values };
                        const res = await api.get('/login', { params: login_to_database });

                        if (res.status === 200 && res.data.results.length > 0) {
                            alert('Login efetuado com sucesso!');
                            props.history.push('/home');
                            resetForm();
                        } else {
                            console.log('erro login', res);
                        }
                    }}
                >
                    {makeForm}
                </Formik>
            </ContainerEditor>
        </Container>
    );
}

export default Login;
