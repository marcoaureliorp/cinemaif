import React from 'react';
import { Container, IconCapa, Desc } from './styles';

function FileUpload({ ...props }) {
    return (
        <Container {...props}>
            <IconCapa />
            <Desc>Adicionar Capa</Desc>
        </Container>
    );
}

export default FileUpload;
