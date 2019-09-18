import React from 'react';
import { TRIGGER_FILTER_GROUP } from '../../constants/triggers_constants';
import Filter from './Filter';

interface STATE {
    filterGroup: TRIGGER_FILTER_GROUP;
}

const FilterGroup: React.FC<STATE> = ({ filterGroup }) => {
    const Filters = filterGroup.filters.map((filter, index) => {
        return <Filter filter={ filter } key={ index }></Filter>
    });
    return (
        <div>
            { Filters }
        </div>
    );
}

export default FilterGroup;
