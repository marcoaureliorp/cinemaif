import React from 'react';
import { SytledDateRange } from './styles';

function DateRange({ onChange, ...props }) {
    return (
        <SytledDateRange
            dayPlaceholder="dd"
            monthPlaceholder="mm"
            yearPlaceholder="yyyy"
            format="dd/MM/y"
            onChange={(value) => {
                if (onChange) onChange(value);
            }}
            {...props}
        />
    );
}

export default DateRange;
