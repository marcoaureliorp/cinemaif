import React, { useState, useEffect } from 'react';
import { Container } from './style';
import Page from '../../components/page';
import Sessao from '../../components/sessao';

import api from '../../services/api';

function Sessoes({ history }) {
    const [sessoes, setSessoes] = useState([]);

    async function getSessoes() {
        const limit = 10;
        const res = await api.get('/sessoes', { limit });
        setSessoes(res.data.results);
    }

    useEffect(() => {
        getSessoes().then();
    }, []);

    return (
        <Page
            title="Sessões"
            history={history}
        >
            <Container>
                {sessoes.length > 0 && sessoes.map(item => (
                    <Sessao
                        key={item.id}
                        id={item.id}
                        filme_id={item.filme.id}
                        titulo={item.filme.titulo}
                        capa={`${api.defaults.baseURL}uploads/${item.filme.capa}`}
                        classificacao={item.filme.classificacao}
                        horarios={[item.inicio_sessao, item.final_sessao]}
                        sala={item.sala.numero}
                        tipo={[item.tipo.descricao]}
                        history={history}
                    />
                ))}
            </Container>
        </Page>
    );
}

export default Sessoes;
