import React, { useState } from 'react';
import './App.css';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Recipe from './recipe/Recipe';
import RECIPE from '../constants/recipe_constants';
import RecipeEditor from './recipe_editor/RecipeEditor';
import { SIM_BASE } from '../constants';

interface STORE {
    recipe: RECIPE;
}

const _initialRecipe = new RECIPE({});
const STORE = {
    recipe: _initialRecipe,
};

const App: React.FC<{}> = () => {
    const [recipe, setRecipeState] = useState<RECIPE>(STORE.recipe);
    recipe.onUpdate = (newRecipe: RECIPE) => {
        STORE.recipe = newRecipe;
        setRecipeState(STORE.recipe);
    };
    return (
        <Container fluid={ true } className="App">
            <Row>
                <Col xs="12" sm="6"><Recipe recipe={ recipe } /></Col>
                <Col xs="12" sm="6">
                    <RecipeEditor selectedIngredient={ recipe.selectedIngredient }>
                </RecipeEditor></Col>
            </Row>
        </Container>
    );
}

export default App;
