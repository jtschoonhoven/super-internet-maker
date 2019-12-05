import React from 'react';
import styled from 'styled-components';


const IngredientWrapperStyle = styled.div`
    padding: 1em;
    background: #FFA50A;
`;

interface Props {
    label: string;
    children: React.ReactElement | React.ReactElement[];
};

const IngredientWrapper: React.FC<Props> = ({ label, children }) => {
    return (
        <IngredientWrapperStyle>
            { label }
            { children }
        </IngredientWrapperStyle>
    );
};

export default IngredientWrapper;
