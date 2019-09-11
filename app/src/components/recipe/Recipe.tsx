import React, { useState } from 'react';

import RECIPE from '../../constants/recipe_constants';
import Trigger from './Trigger';
import TriggerSelector from './TriggerSelector';

interface STATE {
    recipe: RECIPE;
}

const Recipe: React.FC<STATE> = ({ recipe }) => {
    const trigger = recipe.trigger;
    return (
        <div className="sim-recipe">
            <TriggerSelector trigger={ trigger } recipe={ recipe } />
            <Trigger trigger={ trigger } />
        </div>
    );
}
export default Recipe;
