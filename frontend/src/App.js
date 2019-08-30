import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './config/css-reset';
import Header from './components/header';
import Sidebar from './components/sidebar';
import { Container, ContainerBottom } from './styles';
import AppContainer from './components/app-container';


import Route from './routes';

function App() {
    return (
        <BrowserRouter>
            <>
                <Container>
                    <GlobalStyle />
                    <Header />
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

export default App;
