import React from 'react';
import { MdPowerSettingsNew, MdSearch } from 'react-icons/md';
import { colors } from '../../config/theme';
import {
    Container, Logo, Bar, ContainerBusca, Search, Text,
} from './styles';

function Header(props) {
    return (
        <Container>
            <Logo>Logo</Logo>
            <Bar>
                <ContainerBusca>
                    <MdSearch color={colors.white} size="25px" />
                    <Search />
                </ContainerBusca>
                <div onClick={() => {
                    props.setUser && props.setUser();
                    window.location.reload();
                }}
                >
                    <MdPowerSettingsNew color={colors.white} size="31px" style={{ marginRight: '12px' }} />
                    <Text weight="bold" font_size={18}>Sair</Text>
                </div>
            </Bar>
        </Container>
    );
}

export default Header;
