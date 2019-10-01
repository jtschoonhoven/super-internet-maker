import React from 'react';
import styled from 'styled-components';

import Filter from './Filter';
import FilterSelector from './FilterSelector';
import { FILTER_GROUP } from '../../constants/triggers_constants';


const FilterListWrapper = styled.div`
    margin-bottom: 1em;
    padding: 1em;
    background: #00BCD1;
`;

interface STATE {
    filterGroup: FILTER_GROUP;
};

const FilterGroupList: React.FC<STATE> = ({ filterGroup }) => {
    const Filters = filterGroup.filters.map((filter, index) => {
        return <Filter filter={ filter } key={ index }></Filter>;
    });
    const Operator = filterGroup.filters.length ? filterGroup.operator : null;
    return (
        <FilterListWrapper>
            { Operator }
            { Filters }
            <FilterSelector filterGroup={ filterGroup } />
        </FilterListWrapper>
    );
}
export default FilterGroupList;
