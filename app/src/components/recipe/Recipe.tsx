import React, { useState } from 'react';
import styled from 'styled-components';

import RECIPE from '../../constants/recipe_constants';
import Trigger from './Trigger';
import TriggerSelector from './TriggerSelector';

const RecipeWrapper = styled.div`
  padding: 1em;
  background: #00BCD1;
`;


interface STATE {
    recipe: RECIPE;
}

const Recipe: React.FC<STATE> = ({ recipe }) => {
    const trigger = recipe.trigger;
    return (
        <RecipeWrapper className="sim-recipe">
            <TriggerSelector recipe={ recipe } />
            <Trigger trigger={ trigger } />
        </RecipeWrapper>
    );
}
export default Recipe;
