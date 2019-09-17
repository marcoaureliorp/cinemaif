import React from 'react';
import { Formik } from 'formik';
import Page from '../../components/page';
import {
    Container, ContainerPreview, ContainerEditor, FilmePreview, Left, Title, Gender, Duration, Right,
} from './style';
import Input from '../../components/form-components/input';
import { ButtonGroup } from '../../components/button/styles';
import Button from '../../components/button';
import FileUpload from '../../components/form-components/file-upload';
import Classificacao from '../../components/classificacao';

function Filme(props) {
    const makeForm = ({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
            <Container>
                <ContainerPreview>
                    <FilmePreview>
                        <Left>
                            <Classificacao
                                classificacao=""
                                background="transparent"
                                border="2px solid white"
                                width={65}
                                z_index={2}
                            />
                            <FileUpload margin="calc(-37px / 2) 0 0 0" />
                            <Title>Título do Filme</Title>
                            <Gender>Gêneros</Gender>
                            <Duration>Duração</Duration>
                        </Left>
                        <Right>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis aliquet risus. Ut hendrerit ac lorem sit amet tincidunt. Ut id erat maximus, fringilla nunc eu, luctus felis. In non enim odio. Nullam aliquam nisl non.

                            Fusce consequat vestibulum sagittis. Etiam sed mauris at diam venenatis luctus id vel augue. Morbi vestibulum, ligula in porta dignissim, arcu velit laoreet sem, id hendrerit felis magna a ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec rhoncus quam ut varius tristique. Vivamus eleifend elit leo, sed fringilla tortor facilisis non. Sed vulputate rhoncus tellus eget cursus. Etiam imperdiet ullamcorper dui, ac porta felis faucibus in.

                            Fusce dapibus tincidunt urna in varius. Donec at neque eget lacus tempus maximus eget et mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate arcu est, in sagittis lorem euismod efficitur. Donec fermentum eget lorem quis malesuada. Ut auctor iaculis magna, at fermentum arcu lacinia at. Duis quis metus sem. Suspendisse placerat quam non velit tincidunt porttitor. Sed viverra quam finibus turpis consequat, vel tempus ipsum bibendum. Praesent posuere nisi hendrerit odio faucibus, sit amet eleifend erat ornare. Vestibulum eleifend ante quis eros semper iaculis. Curabitur et neque laoreet, consequat eros eget, venenatis ex.

                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis aliquet risus. Ut hendrerit ac lorem sit amet tincidunt. Ut id erat maximus, fringilla nunc eu, luctus felis. In non enim odio. Nullam aliquam nisl non.
                        </Right>
                    </FilmePreview>
                </ContainerPreview>
                <ContainerEditor>
                    <Input
                        name="titulo"
                        margin="0 0 19px 0"
                        placeholder="Título do filme"
                    />
                    <Input
                        name="duracao"
                        margin="0 0 19px 0"
                        placeholder="Duração do filme"
                    />
                    <Input
                        name="classificacao"
                        margin="0 0 19px 0"
                        placeholder="Classificação do filme"
                    />
                    <Input
                        name="generos"
                        margin="0 0 19px 0"
                        placeholder="Gêneros do filme"
                    />
                    <Input
                        name="sinopse"
                        margin="0 0 19px 0"
                        height="375px"
                        placeholder="Sinopse do filme"
                    />
                    <ButtonGroup>
                        <Button kind="cancel" label="Cancelar" />
                        <Button kind="save" label="Salvar" />
                    </ButtonGroup>
                </ContainerEditor>
            </Container>
        </form>
    );

    return (
        <Page title="Cadastro de Filmes">
            <Formik>
                {makeForm}
            </Formik>
        </Page>
    );
}

export default Filme;
