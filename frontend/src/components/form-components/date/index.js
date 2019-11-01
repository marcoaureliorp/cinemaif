import React, { useState, useRef } from 'react';
import Moment from 'moment';
import { Container, SytledDateRange } from './styles';
import useClickOutside from './hook';

function Date({ onChange, onBlur, ...props }) {
    const [calendarOpen, setCalendarOpen] = useState(false);
    const inputRef = useRef(null);

    function handleClick(event) {
        if (onBlur) onBlur(event);
        setCalendarOpen(true);
    }

    useClickOutside(inputRef, () => {
        setCalendarOpen(false);
    });

    return (
        <Container
            {...props}
            onClick={handleClick}
            ref={inputRef}
        >
            {props.value !== null ? Moment(props.value).format('DD/M/YYYY') : props.placeholder}
            {calendarOpen && (
                <SytledDateRange
                    dayPlaceholder="dd"
                    monthPlaceholder="mm"
                    yearPlaceholder="yyyy"
                    format="dd/MM/y"
                    onChange={(value) => {
                        if (onChange) onChange(value);
                        setCalendarOpen(false);
                    }}
                    {...props}
                />
            )}
        </Container>

    );
}

export default Date;
