import React from 'react';
import styled from 'styled-components';

import { TRIGGER_FILTER, FILTER_GROUP } from '../../constants/triggers_constants';

const FilterWrapper = styled.div`
    margin-bottom: 1em;
    padding: 1em;
    background: #FF5459;
`;

interface STATE {
    filter: TRIGGER_FILTER | FILTER_GROUP;
};

const Filter: React.FC<STATE> = ({ filter }) => {
    if (filter instanceof TRIGGER_FILTER) {
        return (
            <FilterWrapper>
                <p>
                    i is a filter on { filter.onField.displayName }
                    of type { filter.type.displayName }
                </p>
            </FilterWrapper>
        );
    }
    else {
        return (<p>i is a filter group</p>);
    }
}
export default Filter;
