import React from 'react';
import GlobalStyle from "./config/css-reset";
import Header from './components/header';
import Sidebar from "./components/sidebar";
import {Container, ContainerBottom} from "./styles";
import AppContainer from "./components/app-container";

function App() {
    return (
        <Container>
            <GlobalStyle/>
            <Header />
            <ContainerBottom>
                <Sidebar/>
                <AppContainer>

                </AppContainer>
            </ContainerBottom>
        </Container>
    );
}

export default App;
