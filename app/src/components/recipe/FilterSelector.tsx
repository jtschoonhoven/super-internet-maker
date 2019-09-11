import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { BASE_TRIGGER } from '../../constants/triggers_constants';
import { BASE_FIELD } from '../../constants/fields_constants';

interface STATE {
    trigger: BASE_TRIGGER;
}

function onSelectFilter(trigger: BASE_TRIGGER, fieldName: string): void {

}

const FilterSelector: React.FC<STATE> = ({ trigger }) => {
    const FilterOptions = Object.entries(trigger.type).map(([fieldName, FieldLabel]) => {
        const displayName = FieldLabel.displayName;
        const Field = FieldLabel.field;
        return (
            <Dropdown.Item as={ Button } eventKey={ fieldName } key={ Field }>
                { Field.displayName }
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
