import React, { useState, useEffect } from 'react';
import { Container } from './style';
import Page from '../../components/page';
import Filme from '../../components/filme';

import api from '../../services/api';

function Home({ history }) {
    const [filmes, setFilmes] = useState([]);

    async function getFilmes() {
        const limit = 10;
        const res = await api.get('/filmes', { limit });
        setFilmes(res.data.results);
    }

    useEffect(() => {
        getFilmes().then();
    }, []);

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
                {filmes.length > 0 && filmes.map(item => (
                    <Filme
                        key={item.id}
                        id={item.id}
                        titulo={item.titulo}
                        generos={item.generos.map(v => v.descricao).join(', ')}
                        capa={`${api.defaults.baseURL}uploads/${item.capa}`}
                        classificacao={item.classificacao}
                        history={history}
                    />
                ))}
            </Container>
        </Page>
    );
}

export default Home;
