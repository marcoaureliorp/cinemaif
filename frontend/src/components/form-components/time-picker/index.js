import React from 'react';
import { StyledRCTimePicker, InputStyle } from './styles';

function TimePicker({onChange,...props}) {
    return (
        <>
            <InputStyle />
            <StyledRCTimePicker
                allowEmpty={false}
                showSecond={false}
                onChange={({_d}) => {
                    if(onChange)onChange(_d);
                }}
                {...props}
            />
        </>
    );
}

export default TimePicker;
