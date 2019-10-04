import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import { Container, DateCard, StyledCalendar } from './styles';
import useClickOutside from './hook';

const dateAlreadyClicked = (dates, date) => dates.some(d => moment(date).isSame(moment(d), 'day'));
const datesExcept = (dates, date) => dates.filter(d => !moment(date).isSame(moment(d), 'day'));

function MultipleDate({ onChange, onBlur, placeholder }) {
    const [dates, setDates] = useState([]);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (onChange) onChange(dates);
    }, [dates]);


    const sortDates = datesToSort => datesToSort.sort((first, second) => new Date(first) - new Date(second));
    const formatedDates = datesToFormat => sortDates(datesToFormat).map(date => moment(date).format('DD/MM'));

    const onClickDay = (date) => {
        if (dateAlreadyClicked(dates, date)) setDates(datesExcept(dates, date));
        else setDates([...dates, date]);
    };

    useClickOutside(inputRef, () => {
        setCalendarOpen(false);
    });

    const tileClassName = ({ date }) => ((dateAlreadyClicked(dates, date)) ? ['active'] : '');

    function handleClick(event) {
        if (onBlur) onBlur(event);
        setCalendarOpen(true);
    }

    return (
        <Container ref={inputRef} padding={dates.length === 0} onClick={handleClick}>
            {dates.length === 0 ? placeholder : formatedDates(dates).map(date => (
                <DateCard>{date}</DateCard>
            ))}
            {calendarOpen && (
                <StyledCalendar
                    tileClassName={tileClassName}
                    onClickDay={onClickDay}
                />
            )}
        </Container>
    );
}

export default MultipleDate;
