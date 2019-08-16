import React from 'react';
import {MdPowerSettingsNew} from 'react-icons/md';
import {colors} from "../../config/theme";
import {Container, Logo, Bar, Text} from './styles.js';

function Header(props) {
    return (
        <Container>
            <Logo>Logo</Logo>
            <Bar>
                <div>input</div>
                <div>
                    <MdPowerSettingsNew color={colors.white} size="31px" style={{marginRight: '12px'}}/>
                    <Text weight="bold" font_size={18}>Sair</Text>
                </div>
            </Bar>
        </Container>
    );
}

export default Header;
