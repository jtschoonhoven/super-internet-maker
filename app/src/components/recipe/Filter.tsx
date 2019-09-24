import React from 'react';
import { TRIGGER_FILTER, FILTER_GROUP } from '../../constants/triggers_constants';

interface STATE {
    filter: TRIGGER_FILTER | FILTER_GROUP;
};

const Filter: React.FC<STATE> = ({ filter }) => {
    console.log('FILTER:');
    console.log(filter);
    if (filter instanceof TRIGGER_FILTER) {
        return (<p>i is a filter on { filter.onField.displayName } of type { filter.type.displayName } </p>);
    }
    else {
        return (<p>i is a filter group</p>);
    }
}
export default Filter;
