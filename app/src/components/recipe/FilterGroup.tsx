import React from 'react';
import { TRIGGER_FILTER_GROUP } from '../../constants/triggers_constants';
import Filter from './Filter';
import FilterSelector from './FilterSelector';

interface STATE {
    filterGroup: TRIGGER_FILTER_GROUP;
}

const FilterGroup: React.FC<STATE> = ({ filterGroup }) => {
    const trigger = filterGroup.getParentTrigger();
    const Filters = filterGroup.filters.map((filter, index) => {
        return <Filter filter={ filter } key={ index }></Filter>
    });
    return (
        <div>
            { Filters }
            <FilterSelector filterGroup={ filterGroup } />
        </div>
    );
}

export default FilterGroup;
