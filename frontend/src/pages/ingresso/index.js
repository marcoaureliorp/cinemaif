import React from 'react';
import Page from '../../components/page';

function Ingresso(props) {
    function calcColumnsAndLines(number) {
        const sqrt = Math.sqrt(number);

        const column = Math.floor(sqrt);
        let line = Math.ceil(sqrt);
        let rest = 0;
        const multiplication_column_line = column * line;

        if (multiplication_column_line > number) {
            rest = number - multiplication_column_line;
            line += 1;
        }
    }

    return (
        <Page title="Ingresso" />
    );
}

export default Ingresso;
