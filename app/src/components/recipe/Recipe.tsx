import React, { useState } from 'react';
import styled from 'styled-components';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import RECIPE from '../../constants/recipe_constants';
import Trigger from './Trigger';
import FilterGroup from './FilterGroup';
import Action from './Action';
import ActionMod from './ActionMod';
import TriggerMod from './TriggerMod';
import { SIM_BASE, BASE_TRIGGER, FILTER_GROUP, BASE_ACTION } from '../../constants';


const RecipeWrapper = styled.div``;

interface STATE {
    recipe: RECIPE;
}

function flattenRecipe(
    node?: SIM_BASE,
    matrix: (React.ReactElement | null)[][] = [[null]],
    rowNum: number = 0,
    colNum: number = 0,
) {
    while (matrix.length <= rowNum) {
        matrix.push([]);
    }
    matrix.forEach((row) => {
        while (row.length <= colNum) {
            row.push(null);
        }
    });
    if (!node) {
        return [];
    }
    if (node instanceof RECIPE) {
        matrix[rowNum][colNum] = <Trigger recipe={ node } />;
        flattenRecipe(node.trigger, matrix, rowNum, colNum + 1);
    }
    else if (node instanceof BASE_TRIGGER) {
        node.filterGroups.forEach((filterGroup) => {
            flattenRecipe(filterGroup, matrix, rowNum, colNum);
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
        flattenRecipe(undefined, matrix, rowNum, colNum);
        matrix[rowNum][colNum] = <TriggerMod trigger={ node } />
    }
    else if (node instanceof BASE_ACTION) {
        matrix[rowNum][colNum] = <Action action={ node }></Action>;
    }
    else {
        matrix[rowNum][colNum] = <div>EMPTY</div>;
    }
    // if (node instanceof BASE_TRIGGER) {
    //     matrix.push([<TriggerMod trigger={ node } />])
    //     flattenRecipe(undefined, matrix, rowNum + 1, colNum + 1);
    // }
    return matrix;
}

const Recipe: React.FC<STATE> = ({ recipe }) => {
    console.log(recipe)
    const matrix = flattenRecipe(recipe);
    const Rows = matrix.map((row, rowNum) => {
        const Cols = row.map((col, colNum) => {
            return <Col key={ colNum }>{ col }</Col>
        });
        return <Row key={ rowNum } className="align-items-center">{ Cols }</Row>;
    });
    return (
        <RecipeWrapper className="sim-recipe">
            { Rows }
        </RecipeWrapper>
    );
}
export default Recipe;
