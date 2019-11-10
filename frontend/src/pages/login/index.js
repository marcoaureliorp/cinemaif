import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import cogoToast from 'cogo-toast';
import { Container, ContainerEditor } from './style';
import Input from '../../components/controlled-input';
import Button from '../../components/button';
import api from '../../services/api';


function Login({ setUser }) {
    // eslint-disable-next-line react/prop-types
    const makeForm = ({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
            <Field
                component={Input}
                name="login"
                margin="0 0 19px 0"
                placeholder="Login"
                autoComplete="off"
                maxLength="255"
            />
            <Field
                component={Input}
                name="senha"
                type="password"
                margin="0 0 19px 0"
                placeholder="Senha"
                maxLength="255"
                minLength="6"
            />
            <Button label="Enviar" kind="save" width="100%" type="submit" />
        </form>
    );

    return (
        <Container>
            <ContainerEditor>
                <Formik
                    enableReinitialize
                    initialValues={{ login: '', senha: '' }}
                    validationSchema={Yup.object({
                        login: Yup.string()
                            .required('Login é obrigatório!'),
                        senha: Yup.string()
                            .required('Senha é obrigatório!'),
                    })}
                    onSubmit={async (values, { setSubmitting, resetForm, ...rest }) => {
                        const login_to_database = { ...values };
                        try {
                            const data = await api.post('auth', {
                                ...login_to_database,
                            });

                            if (data.status) {
                                cogoToast.success('Login efetuado!');
                                setUser(data.data);
                            } else {
                                cogoToast.error('E-mail ou senha incorretos');
                                console.log('E-mail ou senha incorretos');
                            }
                        } catch (e) {
                            cogoToast.error('E-mail ou senha incorretos');
                            console.error('E-mail ou senha incorretos');
                        }
                    }}
                >
                    {makeForm}
                </Formik>
                <a
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/usuario';
                    }}
                >
Não tenho cadastro
                </a>
            </ContainerEditor>
        </Container>
    );
}

export default Login;
