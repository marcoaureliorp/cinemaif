import styled from 'styled-components';
import { colors } from '../../config/theme';
import capa from '../../images/capa.jpg';
import { parse } from '../../util/styled-components/font-size';

const ContainerSessao = styled('div')`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
`;

const Container = styled('div')`
  width: calc(50% - 100px);
  height: 396px;
  background-color: ${colors.light_black};
  border-radius: 13px;
  box-shadow: 0 0 11px #FFFFFF2B;
  overflow: hidden;
  display: flex;
  margin-right: 100px;
  margin-bottom: 50px;
  
  &:nth-child(2n) {
    margin-right: 0;
  }
`;

const ContainerCapa = styled('div')`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  position:relative;
`;

const Capa = styled('div')`
  width: 100%;
  height: 100%;
  background: url("${props => (props.capa ? props.capa : capa)}") center / cover no-repeat;
`;

const ContainerInfo = styled('div')`
  max-width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Title = styled('h3')`
  color: ${colors.blue_grey};
  font-size: ${props => (props.font_size ? parse(props.font_size) : parse(16))};
  margin-bottom: 30px;
  text-overflow: ellipsis;
  font-weight: bold;
`;

export {
    ContainerSessao, Container, ContainerCapa, Capa, ContainerInfo, Title,
};
