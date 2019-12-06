import React from 'react';
import styled from 'styled-components';

import TriggerSelector from './TriggerSelector';
import { SIM_BASE, BASE_TRIGGER, RECIPE, FILTER_GROUP } from '../../constants';

interface STATE {
    selectedIngredient: SIM_BASE;
};

const RecipeEditorWrapper = styled.div``;

const RecipeEditor: React.FC<STATE> = ({ selectedIngredient }) => {
    let IngredientEditor = <p>Uh oh</p>;
    if (selectedIngredient instanceof RECIPE) {
        IngredientEditor = <TriggerSelector recipe={ selectedIngredient }></TriggerSelector>;
    }
    else if (selectedIngredient instanceof FILTER_GROUP) {
        IngredientEditor = <p>Filter group TODO</p>
    }
    return (
        <RecipeEditorWrapper>
            { IngredientEditor }
        </RecipeEditorWrapper>
    );
};

export default RecipeEditor;
