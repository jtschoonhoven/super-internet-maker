import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import get from 'lodash/get';
import React from 'react';

import { BASE_EVENT, EVENT_FIELD_LABEL } from '../../constants/events_constants';
import { BASE_FIELD } from '../../constants/fields_constants';
import { TRIGGER_FILTER, TRIGGER_FILTER_GROUP } from '../../constants/triggers_constants';
import { BASE_FILTER } from '../../constants/filters_constants';

interface STATE {
    filterGroup: TRIGGER_FILTER_GROUP;
}

function onAddFilter(filterGroup: TRIGGER_FILTER_GROUP, fieldName: string): void {
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
        <Form>
            <Dropdown onSelect={ (fieldName: string): void => { onAddFilter(filterGroup, fieldName) } }>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Add Filter
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    { FilterOptions }
                </Dropdown.Menu>
            </Dropdown>
        </Form>
    );
}
export default FilterSelector;
