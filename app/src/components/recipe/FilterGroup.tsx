import React from 'react';
import styled from 'styled-components';

import { FILTER_GROUP } from '../../constants/triggers_constants';
import FilterSelector from './FilterSelector';
import ActionSelector from './ActionSelector';
import FilterGroupList from './FilterGroupList';


const FilterGroupWrapper = styled.div`
    margin-bottom: 1em;
    padding: 1em;
    background: #FFDE07;
`;

interface STATE {
    filterGroup: FILTER_GROUP;
}

const FilterGroup: React.FC<STATE> = ({ filterGroup }) => {
    let Condition = null;
    if (filterGroup.filters.length) {
        let conditionText;
        if (filterGroup.condition === 'if') {
            conditionText = 'If these filters match...';
        }
        if (filterGroup.condition === 'elif') {
            conditionText = 'Else if these filters match...';
        }
        Condition = <h3>{ conditionText }</h3>;

    }
    return (
        <FilterGroupWrapper className="sim-filter-group">
            { Condition }
            <FilterGroupList filterGroup={ filterGroup } />
            <ActionSelector filterGroup={ filterGroup } />
        </FilterGroupWrapper>
    );
}

export default FilterGroup;
