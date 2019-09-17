import styled from 'styled-components';
import { parse } from '../../util/styled-components/font-size';
import { colors } from '../../config/theme';

const Container = styled('div')`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
`;

const ContainerPreview = styled('div')`
    width: 880px;
    height: 620px;
`;

const FilmePreview = styled('div')`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
`;

const Left = styled('div')`
    width: 270px;
    height: auto;
    display: flex;
    flex-direction: column;
`;


const ContainerEditor = styled('div')`
    width: 450px;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const Title = styled('p')`
    font-size: ${parse(20)};
    font-weight: bold;
    color: ${colors.white};
    margin-top: 17px;
    margin-bottom: 9px;
`;

const Gender = styled('p')`
    font-size: ${parse(16)};
    color: ${colors.blue_grey};
    margin-bottom: 9px;
`;

const Duration = styled('p')`
    font-size: ${parse(16)};
    color: ${colors.white};
`;

const Right = styled('div')`
    font-size: ${parse(16)};
    color: ${colors.white};
    width: calc(100% - 300px);
    height: auto;    
`;

export {
    Container, ContainerPreview, ContainerEditor, FilmePreview, Left, Title, Gender, Duration, Right,
};
