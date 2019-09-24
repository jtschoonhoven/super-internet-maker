import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import get from 'lodash/get';
import React from 'react';

import { BASE_EVENT, EVENT_FIELD_LABEL } from '../../constants/events_constants';
import { BASE_FIELD } from '../../constants/fields_constants';
import { TRIGGER_FILTER, FILTER_GROUP } from '../../constants/triggers_constants';
import { BASE_FILTER } from '../../constants/filters_constants';

const FilterSelectorWrapper = styled.div``;

interface STATE {
    filterGroup: FILTER_GROUP;
}

function onAddFilter(filterGroup: FILTER_GROUP, fieldName: string): void {
    const trigger = filterGroup.getParentTrigger();
    const Event = (trigger.type as typeof BASE_EVENT);
    const FieldLabel: EVENT_FIELD_LABEL<typeof BASE_FIELD> = get(Event, fieldName);
    const Field = FieldLabel.field;
    console.log(`You selected ${ FieldLabel.displayName } on type ${ Field.displayName }`);
    const newFilter = new TRIGGER_FILTER({
        type: new BASE_FILTER({ displayName: 'TODO' }),
        onField: Field,
        parent: filterGroup,
    });
    filterGroup.addFilter({ filter: newFilter });
}

const FilterSelector: React.FC<STATE> = ({ filterGroup }) => {
    const trigger = filterGroup.getParentTrigger();
    const FilterOptions = Object.entries(trigger.type).map(([fieldName, FieldLabel]) => {
        return (
            <Dropdown.Item as={ Button } eventKey={ fieldName } key={ fieldName }>
                { FieldLabel.displayName }
            </Dropdown.Item>
        );
    });
    return (
        <FilterSelectorWrapper>
            <Dropdown onSelect={ (fieldName: string): void => { onAddFilter(filterGroup, fieldName) } }>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Add Filter
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    { FilterOptions }
                </Dropdown.Menu>
            </Dropdown>
        </FilterSelectorWrapper>
    );
}
export default FilterSelector;
