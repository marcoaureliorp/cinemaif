import React from 'react';
import { Formik, Field } from 'formik';
import { Container, ContainerEditor } from './styles';
import Input from '../controlled-input';
import Button from '../button';
import api from '../../services/api';

function Usuario(props) {
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
            <Field
                component={Input}
                name="data_nascimento"
                margin="0 0 19px 0"
                // type="date"
                placeholder="Data de Nascimento"
            />
            <Button label="Salvar" kind="save" width="100%" type="submit" />
        </form>
    );

    return (
        <Container>
            <ContainerEditor>
                <Formik
                    onSubmit={async (values, { setSubmitting, resetForm, ...rest }) => {
                        const usuario_to_database = { ...values };
                        const res = await api.post('/usuarios', { usuario: usuario_to_database });

                        if (res.status === 200) {
                            resetForm();
                        }
                    }}
                >
                    {makeForm}
                </Formik>
            </ContainerEditor>
        </Container>
    );
}

export default Usuario;
