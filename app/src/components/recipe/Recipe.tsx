import React, { useState } from 'react';
import styled from 'styled-components';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import RECIPE from '../../constants/recipe_constants';
import Trigger from './Trigger';
import FilterGroup from './FilterGroup';
import { SIM_BASE, BASE_TRIGGER, FILTER_GROUP, BASE_ACTION } from '../../constants';
import Action from './Action';


const RecipeWrapper = styled.div`
`;

interface STATE {
    recipe: RECIPE;
}

function flattenRecipe(
    node?: SIM_BASE,
    matrix: (React.ReactElement | null)[][] = [[null]],
    rowNum: number = 0,
    colNum: number = 0,
) {
    if (!node) {
        return [];
    }
    while (matrix.length <= rowNum) {
        matrix.push([]);
    }
    matrix.forEach((row) => {
        while (row.length <= colNum) {
            row.push(null);
        }
    });
    if (node instanceof RECIPE) {
        matrix[rowNum][colNum] = <Trigger recipe={ node } />;
        flattenRecipe(node.trigger, matrix, rowNum, colNum);
    }
    else if (node instanceof BASE_TRIGGER) {
        node.filterGroups.forEach((filterGroup) => {
            flattenRecipe(filterGroup, matrix, rowNum, colNum + 1);
            rowNum += 1;
        });
    }
    else if (node instanceof FILTER_GROUP) {
        matrix[rowNum][colNum] = <FilterGroup filterGroup={ node }></FilterGroup>;
        colNum += 1;
        node.actions.forEach((action) => {
            flattenRecipe(action, matrix, rowNum, colNum);
            rowNum += 1;
        });
    }
    else if (node instanceof BASE_ACTION) {
        matrix[rowNum][colNum] = <Action action={ node }></Action>;
    }
    else {
        matrix[rowNum][colNum] = <div>EMPTY</div>;
    }
    return matrix;
}

const Recipe: React.FC<STATE> = ({ recipe }) => {
    const matrix = flattenRecipe(recipe);
    const Rows = matrix.map((row, rowNum) => {
        const Cols = row.map((col, colNum) => {
            return <Col key={ colNum }>{ col }</Col>
        });
        return <Row key={ rowNum }>{ Cols }</Row>;
    });
    console.log(matrix);
    return (
        <RecipeWrapper className="sim-recipe">
            { Rows }
        </RecipeWrapper>
    );
}
export default Recipe;
