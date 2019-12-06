import React from 'react';
import styled from 'styled-components';

import IngredientWrapper from './IngredientWrapper';
import FilterGroupList from './FilterGroupList';
import { FILTER_GROUP } from '../../constants';

const FilterGroupWrapper = styled.div``;

interface STATE {
    filterGroup: FILTER_GROUP;
}

const FilterGroup: React.FC<STATE> = ({ filterGroup }) => {
    return (
        <FilterGroupWrapper>
            <IngredientWrapper label="Filter group" ingredient={ filterGroup }></IngredientWrapper>
            <FilterGroupList filterGroup={ filterGroup } />
        </FilterGroupWrapper>
    );
    // let Condition = null;
    // if (filterGroup.filters.length) {
    //     let conditionText;
    //     if (filterGroup.condition === 'if') {
    //         conditionText = 'If these filters match...';
    //     }
    //     if (filterGroup.condition === 'elif') {
    //         conditionText = 'Else if these filters match...';
    //     }
    //     Condition = <h3>{ conditionText }</h3>;

    // }
    // return (
    //     <FilterGroupWrapper className="sim-filter-group">
    //         { Condition }
    //         <FilterGroupList filterGroup={ filterGroup } />
    //         {/* <ActionSelector filterGroup={ filterGroup } /> */}
    //     </FilterGroupWrapper>
    // );
}

export default FilterGroup;
