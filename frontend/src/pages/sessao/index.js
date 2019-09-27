import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Page from '../../components/page';
import { Container, StyledCalendar } from './styles';

const dateAlreadyClicked = (dates, date) => dates.some(d => moment(date).isSame(moment(d), 'day'));
const datesExcept = (dates, date) => dates.filter(d => !moment(date).isSame(moment(d), 'day'));

function Sessao(props) {
    const [dates, setDates] = useState([]);

    console.log(dates);

    const onClickDay = (date) => {
        // if day is already clicked, remove it from state
        if (dateAlreadyClicked(dates, date)) setDates(datesExcept(dates, date));
        else setDates([...dates, date]);
    };

    const tileClassName = ({ date }) => {
        const classNames = ['normal'];
        if (dateAlreadyClicked(dates, date)) return ['active', ...classNames];
        return classNames;
    };


    return (
        <Page title="Sessão">
            <Container>
                <StyledCalendar
                    isOpen
                    tileClassName={tileClassName}
                    onClickDay={onClickDay}
                />
            </Container>
        </Page>
    );
}

export default Sessao;
