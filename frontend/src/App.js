import React from 'react';
import GlobalStyle from "./config/css-reset";
import Header from './components/header';
import Sidebar from "./components/sidebar";
import {Container, ContainerBottom} from "./styles";
import AppContainer from "./components/app-container";
import Filme from "./components/filme";

function App() {
    return (
        <Container>
            <GlobalStyle/>
            <Header />
            <ContainerBottom>
                <Sidebar/>
                <AppContainer>
                   <Filme />
                </AppContainer>
            </ContainerBottom>
        </Container>
    );
}

export default App;
