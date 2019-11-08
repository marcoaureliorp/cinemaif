import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './config/css-reset';
import Header from './components/header';
import Sidebar from './components/sidebar';
import { Container, ContainerBottom } from './styles';
import AppContainer from './components/app-container';
import api from './services/api';


import Route from './routes';
import Login from './pages/login';
import Usuario from './pages/usuario';

function App() {
    const [appUser, setAppUser] = useState(null);
    const [validatingToken, setValidatingToken] = useState(true);

    useEffect(() => {
        validateToken();
    }, []);

    const setUser = (user) => {
        if (user) {
            api.defaults.headers.common.Authorization = `bearer ${user.token}`;
            localStorage.setItem('userKey', JSON.stringify(user));
            setAppUser(user);
        } else {
            delete api.defaults.headers.common.Authorization;
            localStorage.removeItem('userKey');
        }
    };

    async function validateToken() {
        setValidatingToken(true);

        const json = localStorage.getItem('userKey');
        const userData = JSON.parse(json);
        setUser();

        if (!userData) {
            setValidatingToken(false);
        }

        const res = await api.post('/auth/validate-token', userData);

        if (res.data) {
            setUser(userData);
            setAppUser(userData);
        } else {
            localStorage.removeItem('userKey');
        }

        setValidatingToken(false);
    }

    if (window.location.pathname === '/usuario') {
        return (
            <>
                <GlobalStyle />
                <Usuario />
            </>
        );
    }
    if (!validatingToken && !appUser) {
        return (
            <>
                <GlobalStyle />
                <Login setUser={setUser} />
            </>
        );
    } if (!validatingToken && appUser) {
        return (
            <BrowserRouter>
                <>
                    <Container>
                        <GlobalStyle />
                        <Header setUser={setUser} />
                        <ContainerBottom>
                            <Sidebar />
                            <AppContainer>
                                <Route />
                            </AppContainer>
                        </ContainerBottom>
                    </Container>
                </>
            </BrowserRouter>
        );
    }

    return (
        <div>Loading</div>
    );
}

export default App;
