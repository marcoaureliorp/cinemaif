import React from 'react';
import { SyncLoader } from 'react-spinners';
import { Container } from './style';
import { colors } from '../../config/theme';

function TableLoader({ loading }) {
    return (
        <Container loadingActive={loading}>
            <SyncLoader color={colors.red} />
        </Container>
    );
}

export default TableLoader;
