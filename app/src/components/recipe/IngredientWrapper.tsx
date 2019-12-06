import React from 'react';
import styled from 'styled-components';

import { SIM_BASE } from '../../constants';


const IngredientWrapperStyle = styled.div`
    padding-left: 1em;
    background: #000000;
`;

const LabelWrapper = styled.div`
    padding-left: 0.5em;
    margin-bottom: 2px;
    background: #334455;
    color: #FAFAFA;
`;

interface Props {
    label: string;
    ingredient: SIM_BASE;
    children?: React.ReactNode;
};

const IngredientWrapper: React.FC<Props> = ({ label, ingredient, children }) => {
    return (
        <IngredientWrapperStyle>
            <LabelWrapper onClick={ () => ingredient && ingredient.setSelectedIngredient() }>
                <span onClick={} >▷</span> { label }
            </LabelWrapper>
            { ingredient.isExpanded ? children : null }
        </IngredientWrapperStyle>
    );
};

export default IngredientWrapper;
