import React from 'react';
import { TRIGGER_FILTER_GROUP } from '../../constants/triggers_constants';
import Filter from './Filter';

interface STATE {
    filters: TRIGGER_FILTER_GROUP;
}

const FilterGroup: React.FC<STATE> = ({ filters }) => {
    const FiltersLogicalAnd = Object.entries(filters.and).map(([uuid, filter]) => {
        return <Filter filter={ filter } key={ uuid }></Filter>
    });
    const FiltersLogicalOr = Object.entries(filters.or).map(([uuid, filter]) => {
        return <Filter filter={ filter } key={ uuid }></Filter>
    });
    return (
        <div>
            { FiltersLogicalAnd }
            { FiltersLogicalOr }
        </div>
    );
}

export default FilterGroup;
