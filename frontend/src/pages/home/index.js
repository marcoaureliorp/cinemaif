import React from 'react';
import { Container } from './style';
import Page from '../../components/page';
import Filme from '../../components/filme';

function Home({ history }) {
    return (
        <Page
            title="Lançamentos"
            button={{
                kind: 'add',
                label: 'Adicionar Filme',
            }}
            history={history}
        >
            <Container>
                <Filme />
                <Filme />
                <Filme />
                <Filme />
                <Filme />
                <Filme />
                <Filme />
            </Container>
        </Page>
    );
}

export default Home;
