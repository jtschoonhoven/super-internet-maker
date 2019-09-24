import React from 'react';
import styled from 'styled-components';
import { FILTER_GROUP } from '../../constants/triggers_constants';
import Filter from './Filter';
import FilterSelector from './FilterSelector';
import ActionSelector from './ActionSelector';

const FilterGroupWrapper = styled.div`
    margin-bottom: 1em;
    padding: 1em;
    background: #FFDE07;
`;

interface STATE {
    filterGroup: FILTER_GROUP;
}

const FilterGroup: React.FC<STATE> = ({ filterGroup }) => {
    const Filters = filterGroup.filters.map((filter, index) => {
        return <Filter filter={ filter } key={ index }></Filter>
    });
    return (
        <FilterGroupWrapper className="sim-filter-group">
            { Filters }
            <FilterSelector filterGroup={ filterGroup } />
            <ActionSelector filterGroup={ filterGroup } />
        </FilterGroupWrapper>
    );
}

export default FilterGroup;
