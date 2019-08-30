import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from './styles';

function Button({ kind, label, children }) {
    const text = children || label;
    return (
        <StyledButton kind={kind}>{text}</StyledButton>
    );
}

Button.propTypes = {
    kind: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

Button.defaultProps = {
    kind: 'default',
    label: null,
    children: null,
};

export default Button;
