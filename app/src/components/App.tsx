import React, { useState } from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Trigger from './Trigger';
import RECIPE from '../constants/recipe';

interface _STATE {
    recipe?: RECIPE;
}
const STATE: _STATE = {};


const App: React.FC = () => {
    return (
        <Container className="App">
            <Row>
                <Col>
                    <Trigger />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
