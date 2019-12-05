import React, { useState } from 'react';
import styled from 'styled-components';

import { RECIPE } from '../../constants';
import Trigger from './Trigger';


const RecipeWrapper = styled.div``;

interface STATE {
    recipe: RECIPE;
}

const Recipe: React.FC<STATE> = ({ recipe }) => {
    console.log(recipe)
    return (
        <RecipeWrapper>
            <Trigger recipe={ recipe }></Trigger>
        </RecipeWrapper>
    );
}
export default Recipe;
