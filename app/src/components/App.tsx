import React, { useState } from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';

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
        <Container fluid={ true } className="App">
            <Recipe recipe={ recipe } />
        </Container>
    );
}

export default App;
