import React from 'react';
import { Container } from './style';
import Page from '../../components/page';
import Filme from '../../components/filme';

function Home() {
    return (
        <Page title="Lançamentos">
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
