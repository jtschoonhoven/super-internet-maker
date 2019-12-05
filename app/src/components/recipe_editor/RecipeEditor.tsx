import React from 'react';
import styled from 'styled-components';

import TriggerSelector from './TriggerSelector';
import { SIM_BASE, BASE_TRIGGER, RECIPE } from '../../constants';

interface STATE {
    selectedIngredient: SIM_BASE;
};

const RecipeEditorWrapper = styled.div``;

const RecipeEditor: React.FC<STATE> = ({ selectedIngredient }) => {
    let IngredientEditor = <p>Uh oh</p>;
    if (selectedIngredient instanceof RECIPE) {
        IngredientEditor = <TriggerSelector recipe={ selectedIngredient }></TriggerSelector>;
    }
    else if (selectedIngredient instanceof BASE_TRIGGER) {
        if (selectedIngredient.parent) {
            IngredientEditor = <TriggerSelector recipe={ selectedIngredient.parent }></TriggerSelector>;
        }
        else {
            throw new Error('Cannot create TriggerSelector from a trigger with no parent');
        }
    }
    return (
        <RecipeEditorWrapper>
            { IngredientEditor }
        </RecipeEditorWrapper>
    );
};

export default RecipeEditor;
