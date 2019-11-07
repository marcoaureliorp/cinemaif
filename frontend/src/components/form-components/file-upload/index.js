import React from 'react';
import PropTypes from 'prop-types';
import {
    Container, ImageContainer, Icon, Image, AddPhoto, IconCapa, Desc,
} from './styles';
import { colors } from '../../../config/theme';

function FileUpload({
    getRootProps, getInputProps, photo, removePhoto, isDragActive, isDragAccept, isDragReject, ...attrs
}) {
    return (
        <Container
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragAccept={isDragAccept}
            isDragReject={isDragReject}
            {...attrs}
        >
            <input {...getInputProps()} />
            {
                photo
                    ? (
                        <ImageContainer>
                            <Icon
                                position="absolute"
                                color={colors.white}
                                onClick={e => removePhoto(e)}
                                display="none"
                            />
                            <Image src={photo} alt="Oloco" />
                        </ImageContainer>
                    )
                    : (
                        <AddPhoto {...attrs}>
                            {(() => {
                                if (isDragReject) {
                                    return 'Arquivo inválido!';
                                }

                                if (isDragActive) {
                                    return 'Solte a foto aqui!';
                                }

                                return (
                                    <>
                                        <IconCapa />
                                        <Desc>Adicionar Capa</Desc>
                                    </>
                                );
                            })()}
                        </AddPhoto>
                    )
            }
        </Container>
    );
}

FileUpload.propTypes = {
    getRootProps: PropTypes.func,
    getInputProps: PropTypes.func,
    removePhoto: PropTypes.func,
    isDragActive: PropTypes.bool,
    isDragAccept: PropTypes.bool,
    isDragReject: PropTypes.bool,
    photo: PropTypes.string,
};

FileUpload.defaultProps = {
    getRootProps: () => {
    },
    getInputProps: () => {
    },
    removePhoto: () => {
    },
    photo: null,
    isDragActive: false,
    isDragAccept: false,
    isDragReject: false,
};

export default FileUpload;
