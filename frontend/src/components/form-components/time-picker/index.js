import React from 'react';
import { StyledTimeRangePicker } from './styles';

function TimePicker({ ...props }) {
    return (
        <StyledTimeRangePicker
            clearAriaLabel="Limpar"
            locale="pt-BR"
            format="HH:mm"
            disableClock
            secondPlaceholder="mm"
            {...props}
        />
    );
}

export default TimePicker;
