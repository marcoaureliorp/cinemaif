import React from 'react';
import Page from '../../components/page';
import { ContainerCadeiras, Cadeira, Line } from './styles';

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function Ingresso(props) {
    function calcColumnsAndLines(number) {
        const sqrt = Math.sqrt(number);

        const column = Math.round(sqrt);
        let line = Math.ceil(sqrt);
        let rest = 0;
        const multiplication_column_line = column * line;

        if (multiplication_column_line > number) {
            rest = number - multiplication_column_line;
            line += 1;
        }

        return {
            line,
            column,
            rest,
        };
    }

    const buildChairs = (number) => {
        const final = [];
        const chairs = calcColumnsAndLines(number);
        let count = 0;

        for (let line = 1; line <= chairs.line; line += 1) {
            const line_component = [];
            for (let column = 1; column <= chairs.column; column += 1) {
                count += 1;
                if (count <= number) {
                    line_component.push(<Cadeira key={column}>
                        l
                        {line}
                        c
                        {column}
                    </Cadeira>);
                }
            }
            final.push(<Line key={line}>{line_component}</Line>);
        }


        return final;
    };
    return (
        <Page title="Ingresso">
            <ContainerCadeiras>
                {buildChairs(43)}
            </ContainerCadeiras>
        </Page>
    );
}

export default Ingresso;
