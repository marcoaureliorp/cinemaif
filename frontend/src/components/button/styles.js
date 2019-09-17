import styled from 'styled-components';
import { parse } from '../../util/styled-components/font-size';
import { colors } from '../../config/theme';

const getButtonKind = (props) => {
    switch (props.kind) {
        case 'save':
            return `
                background-color: ${colors.green};
                color: ${colors.white};
            `;
        case 'cancel':
            return `
                background-color: ${colors.red};
                color: ${colors.white};
            `;
        default:
            return `
                background-color: ${colors.red};
                color: ${colors.white};
            `;
    }
};

const StyledButton = styled('div')`
    padding: 18px 20px;
    font-size: ${parse(18)};
    font-weight: bold;
    min-width: 200px;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 13px;
    width: ${props => (props.width ? props.width : '200px')};
    ${props => getButtonKind(props)}
    
    &:hover {
        cursor: pointer;
    }
`;

const ButtonGroup = styled('div')`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: auto;
    ${props => (props.margin ? `margin: ${props.margin}` : null)};
`;

export { StyledButton, ButtonGroup };
