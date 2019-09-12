import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { BASE_TRIGGER } from '../../constants/triggers_constants';
import { BASE_EVENT, EVENT_FIELD_LABEL } from '../../constants/events_constants';
import get from 'lodash/get';
import { BASE_FIELD } from '../../constants/fields_constants';

interface STATE {
    trigger: BASE_TRIGGER;
}

function onSelectFilter(trigger: BASE_TRIGGER, fieldName: string): void {
    const Event = (trigger.type as typeof BASE_EVENT);
    const FieldLabel: EVENT_FIELD_LABEL<typeof BASE_FIELD> = get(Event, fieldName);
    const Field = FieldLabel.field;
    console.log(`You selected ${ FieldLabel.displayName } on type ${ Field.displayName }`)
}

const FilterSelector: React.FC<STATE> = ({ trigger }) => {
    const FilterOptions = Object.entries(trigger.type).map(([fieldName, FieldLabel]) => {
        return (
            <Dropdown.Item as={ Button } eventKey={ fieldName } key={ fieldName }>
                { FieldLabel.displayName }
            </Dropdown.Item>
        );
    });
    return (
        <Form>
            <Dropdown onSelect={ (fieldName: string): void => { onSelectFilter(trigger, fieldName) } }>
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
