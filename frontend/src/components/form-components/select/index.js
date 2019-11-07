import React from 'react';
import PropTypes from 'prop-types';
import { parse } from '../../../util/styled-components/font-size';
import { StyledSelect, StyledAsyncSelect, Container } from './styles';
import { colors } from '../../../config/theme';

function Select({
    width, height, type_select, icon, label, error_message, name, margin, ...props
}) {
    const id = props.id || name;

    const show_icon = icon !== null;

    const addTheme = theme => (
        {
            ...theme,
            colors: {
                ...theme.colors,
                primary: colors.red,
                primary25: colors.light_red,
                primary50: colors.red,
                primary75: colors.red,
            },
        }
    );

    const addCustomStyles = {
        control: (provided, state) => {
            const borderWidth = 3;
            const borderRadius = 10;
            const { menuIsOpen } = state;
            const boxShadow = colors.light_red;
            let borderColor = menuIsOpen ? colors.red : 'transparent';
            borderColor = error_message && error_message !== '' ? colors.red : borderColor;

            return {
                ...provided,
                boxShadow,
                borderWidth,
                borderRadius,
                borderColor,
            };
        },
        container: (provided, state) => ({
            ...provided,
            width,
            height: 'auto',
        }),
        input: (provided, state) => ({
            ...provided,
            height: '56px',
            fontSize: parse(20),
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'bold',
            paddingLeft: '7px',
        }),
        placeholder: (provided, state) => ({
            ...provided,
            fontSize: parse(20),
            fontWeight: 'bold',
            paddingLeft: '7px',
        }),
        singleValue: (provided, state) => ({
            ...provided,
            fontSize: parse(20),
            fontWeight: 'bold',
            paddingLeft: '7px',
        }),
    };

    const attrs = {
        id,
        name,
        ...props,
    };

    const ReactStyledSelect = type_select === 'async' ? StyledAsyncSelect : StyledSelect;

    return (
        <Container width={width} margin={margin} >
            <ReactStyledSelect
                {...attrs}
                theme={addTheme}
                styles={addCustomStyles}
            />
        </Container>
    );
}

Select.propTypes = {
    isClearable: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    isSearchable: PropTypes.bool,
    loadingMessage: PropTypes.func,
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    noOptionsMessage: PropTypes.func,
    options: PropTypes.array,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    type_select: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    margin: PropTypes.string,
    icon: PropTypes.string,
    error_message: PropTypes.string,
};

Select.defaultProps = {
    isClearable: true,
    isDisabled: false,
    isLoading: false,
    isSearchable: true,
    loadingMessage: () => 'Carregando resultados...',
    noOptionsMessage: () => 'Nenhum resultado encontrado',
    id: null,
    onChange: null,
    onKeyDown: null,
    type_select: '',
    width: '100%',
    height: 'auto',
    margin: null,
    icon: null,
    error_message: null,
    options: [],
};


export default Select;
