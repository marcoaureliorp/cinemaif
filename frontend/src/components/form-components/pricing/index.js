import React from 'react';
import { StyledCurrencyFormat } from './styles';

function Pricing({ placeholder, onChange, ...rest }) {
    return (
        <StyledCurrencyFormat
            decimalSeparator=","
            allowNegative={false}
            prefix="R$ "
            decimalScale={2}
            thousandSeparator=" "
            thousandsGroupStyle="thousand"
            placeholder={placeholder}
            fixedDecimalScale
            onValueChange={({ floatValue }) => {
                if (onChange) onChange(floatValue);
            }}
            {...rest}
        />
    );
}

export default Pricing;
