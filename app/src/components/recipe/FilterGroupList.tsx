import React from 'react';

import IngredientWrapper from './IngredientWrapper';
import { FILTER_GROUP } from '../../constants';


interface STATE {
    filterGroup: FILTER_GROUP;
};

const FilterGroupList: React.FC<STATE> = ({ filterGroup }) => {
    // const Filters = filterGroup.filters.map((filter, index) => {
    //     return <Filter filter={ filter } key={ index }></Filter>;
    // });
    const Operator = filterGroup.filters.length ? filterGroup.operator : null;
    return (
        <IngredientWrapper label="label">
            {/* { Operator }
            { Filters }
            <FilterSelector filterGroup={ filterGroup } /> */}
        </IngredientWrapper>
    );
}
export default FilterGroupList;
