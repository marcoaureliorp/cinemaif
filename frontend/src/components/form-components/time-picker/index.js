import React from 'react';
import { StyledRCTimePicker, InputStyle } from './styles';

function TimePicker({ onChange, ...props }) {
    return (
        <>
            <InputStyle />
            <StyledRCTimePicker
                allowEmpty={false}
                showSecond={false}
                {...props}
                onChange={(event) => {
                    if (onChange)onChange(event);
                }}
            />
        </>
    );
}

export default TimePicker;
