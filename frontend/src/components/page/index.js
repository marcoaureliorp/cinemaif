import React from 'react';
import {Container} from './styles';

function Page({children, title}) {
    return (
        <Container>
            <h2>{title}</h2>
            {children}
        </Container>
    );
}

export default Page;
