import React from 'react';
import { Formik, Field } from 'formik';
import Page from '../../components/page';
import { Container } from './styles';
import Input from '../../components/controlled-input';


function Sessao(props) {
    function makeForm({ handleSubmit, ...rest }) {
        console.log(rest);
        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name="dias"
                    id="dias"
                    placeholder="Dias da sessão"
                    type="multiple_date"
                    component={Input}
                />
                <Field
                    name="preco"
                    id="preco"
                    placeholder="Preço"
                    type="pricing"
                    component={Input}
                />
                <Field
                    names={['inicio', 'fim']}
                    ids={['inicio', 'fim']}
                    type="date_range"
                    component={Input}
                />
            </form>
        );
    }
    return (
        <Page title="Sessão">
            <Container>
                <Formik>
                    {makeForm}
                </Formik>
            </Container>
        </Page>
    );
}

export default Sessao;
