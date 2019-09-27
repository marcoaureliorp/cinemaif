import React from 'react';
import PropTypes from 'prop-types';
import { Container, ContainerTitle } from './styles';
import Button from '../button';

function Page({
    // eslint-disable-next-line react/prop-types
    children, title, history, ...props
}) {
    return (
        <Container>
            <ContainerTitle>
                <h2>{title}</h2>
                {props.button && (
                    <Button
                        kind={props.button.kind}
                        label={props.button.label}
                        onClick={() => history.push('/filme')}
                    />
                )}
            </ContainerTitle>
            {children}
        </Container>
    );
}

Page.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    title: PropTypes.string.isRequired,
    button: PropTypes.object,
};

Page.defaultProps = {
    children: null,
};

export default Page;
