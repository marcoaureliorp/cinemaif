import React from 'react';
import PropTypes from 'prop-types';

import { StyledInput } from './styles';

function Input({ type, ...attrs }) {
    return (
        <StyledInput type={type} {...attrs} />
    );
}

Input.propTypes = {
    type: PropTypes.string,
};

Input.defaultProps = {
    type: 'text',
};

export default Input;
