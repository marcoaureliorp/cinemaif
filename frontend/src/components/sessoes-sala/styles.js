import styled from 'styled-components';
import { colors } from '../../config/theme';
import { parse } from '../../util/styled-components/font-size';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
`;

const ContainerTipo = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Sala = styled('div')`
  color: ${colors.blue_grey};
  font-size: ${props => (props.font_size ? parse(props.font_size) : parse(16))};
  font-weight: bold;
`;

const TipoSala = styled('div')`
  margin-left: 10px;
  color: ${colors.black};
  font-size: ${props => (props.font_size ? parse(props.font_size) : parse(14))};
  border-radius: 25px;
  background-color: ${colors.yellow};
  padding: 5px 9px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContainerHorarios = styled('div')`
  display: flex;
  flex-flow: row wrap;
`;

const Horario = styled('div')`
  border: 1px solid ${colors.strong_red};
  color: ${colors.white};
  font-size: ${props => (props.font_size ? parse(props.font_size) : parse(16))};
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 25px;
  font-weight: bold;
  
  &:hover {
    background-color: ${colors.strong_red};
  }
`;

export {
    Container, ContainerTipo, Sala, ContainerHorarios, TipoSala, Horario,
};
