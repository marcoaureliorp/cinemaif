import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import Moment from 'moment';
import cogoToast from 'cogo-toast';
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
                type="date"
                placeholder="Data de Nascimento"
            />
            <Button label="Salvar" kind="save" width="100%" type="submit" />
        </form>
    );

    return (
        <Container>
            <ContainerEditor>
                <Formik
                    initialValues={{ login: '', senha: '', data_nascimento: null }}
                    validationSchema={Yup.object({
                        login: Yup.string()
                            .required('Login é obrigatório!'),
                        senha: Yup.string()
                            .required('Senha é obrigatório!'),
                        data_nascimento: Yup.mixed().required().validDate(),
                    })}
                    onSubmit={async (values, { setSubmitting, resetForm, ...rest }) => {
                        const usuario_to_database = { ...values };

                        usuario_to_database.data_nascimento = Moment(usuario_to_database.data_nascimento)
                            .format('DD/M/YYYY');

                        const res = await api.post('/usuarios', { usuario: usuario_to_database });

                        if (res.status === 200) {
                            cogoToast.success('Usuário cadastrado com sucesso!');
                            window.location.href = '/';
                            resetForm();
                        } else {
                            console.log(res.error);
                            cogoToast.error('Erro ao cadastrar Usuário!');
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
