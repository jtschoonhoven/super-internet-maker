import React from 'react';
import IngredientWrapper from './IngredientWrapper';

import { TRIGGER_FILTER, FILTER_GROUP } from '../../constants';


interface STATE {
    filter: TRIGGER_FILTER | FILTER_GROUP;
};

const Filter: React.FC<STATE> = ({ filter }) => {
    if (filter instanceof TRIGGER_FILTER) {
        const label = `i is a filter on ${ filter.onField.displayName } of type ${ filter.type.displayName }`;
        return (
            <IngredientWrapper label={ label } ingredient={ filter }>
            </IngredientWrapper>
        );
    }
    else {
        return (<p>i is a filter group</p>);
    }
}
export default Filter;
