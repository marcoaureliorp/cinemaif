import React from 'react';
import {StyledRCTimePicker} from './styles2';

function TimePicker(props) {
    return (
        <StyledRCTimePicker
            allowEmpty={false}
            placeholder="Hora"
            showSecond={false}
        />
    );
}

export default TimePicker;
