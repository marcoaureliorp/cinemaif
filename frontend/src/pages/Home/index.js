import React from 'react';
import Page from '../../components/page';
import Filme from '../../components/filme';
import Input from '../../components/form-components/input';
import Button from '../../components/button';

function Home() {
    return (
        <Page title="Lançamentos">
            <Filme />
            <Input placeholder="Input" />
            <Button label="Butão" kind="save" />
        </Page>
    );
}

export default Home;
