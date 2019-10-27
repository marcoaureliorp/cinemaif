import React from 'react';
import { Formik, Field } from 'formik';
import { Container, ContainerEditor } from './styles';
import ControlledInput from '../../components/controlled-input';
import Button from '../../components/button';
import api from '../../services/api';

function Usuario(props) {
    // eslint-disable-next-line react/prop-types
    const makeForm = ({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
            <Field
                component={ControlledInput}
                name="login"
                margin="0 0 19px 0"
                placeholder="Login"
            />
            <Field
                component={ControlledInput}
                name="senha"
                type="password"
                margin="0 0 19px 0"
                placeholder="Senha"
            />
            <Field
                component={ControlledInput}
                name="data_nascimento"
                id="data_nascimento"
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
