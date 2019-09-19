import React, { useState } from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Recipe from './recipe/Recipe';
import RECIPE from '../constants/recipe_constants';

const _STORE = {
    recipe: new RECIPE({}),
};

const App: React.FC = () => {
    const [recipe, setRecipeState] = useState<RECIPE>(_STORE.recipe);
    recipe.onUpdate = (newRecipe: RECIPE) => {
        _STORE.recipe = newRecipe;
        setRecipeState(_STORE.recipe);
    };
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
