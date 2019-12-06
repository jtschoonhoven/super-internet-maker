import React from 'react';
import styled from 'styled-components';

import { SIM_BASE } from '../../constants';


const IngredientWrapperStyle = styled.div`
    padding-left: 1em;
`;

const LabelWrapper = styled.div`
    padding-left: 0.5em;
    margin-top: 1em;
    background: #334455;
    color: #FAFAFA;
`;

interface Props {
    label: string;
    ingredient?: SIM_BASE;
    children?: React.ReactElement | React.ReactElement[];
};

const IngredientWrapper: React.FC<Props> = ({
    label,
    ingredient,
    children,
}) => {
    return (
        <IngredientWrapperStyle>
            <LabelWrapper onClick={ () => ingredient && ingredient.setSelectedIngredient() }>
                <p>{ label }</p>
            </LabelWrapper>
            { children }
        </IngredientWrapperStyle>
    );
};

export default IngredientWrapper;
