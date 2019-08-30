import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function AppContainer({ children }) {
    return (
        <Container>{children}</Container>
    );
}

AppContainer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

AppContainer.defaultProps = {
    children: null,
};


export default AppContainer;
