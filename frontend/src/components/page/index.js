import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

function Page({ children, title }) {
    return (
        <Container>
            <h2>{title}</h2>
            {children}
        </Container>
    );
}

Page.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    title: PropTypes.string.isRequired,
};

Page.defaultProps = {
    children: null,
};

export default Page;
