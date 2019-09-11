import React, { useState } from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Recipe from './recipe/Recipe';
import RECIPE from '../constants/recipe_constants';

interface _STATE {
    recipe?: RECIPE;
}
const STATE: _STATE = {};


const App: React.FC = () => {
    const [recipe, setRecipeState] = useState<RECIPE>(new RECIPE());
    recipe.onUpdate = setRecipeState;
    return (
        <Container className="App">
            <Row>
                <Col>
                    <Recipe recipe={ recipe } />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
