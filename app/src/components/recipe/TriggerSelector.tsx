import React from 'react';
import Form from 'react-bootstrap/Form';

import TRIGGERS, { BASE_TRIGGER } from '../../constants/triggers_constants';
import RECIPE from '../../constants/recipe_constants';

interface STATE {
    recipe: RECIPE;
    trigger?: BASE_TRIGGER;
}

function onSelectTrigger(recipe: RECIPE, triggerName: string | undefined): void {
    if (!triggerName) {
        return;
    }
    recipe.setTrigger(TRIGGERS[triggerName]);
}

const TriggerSelector: React.FC<STATE> = ({ trigger, recipe }) => {
    let selectedName = trigger ? trigger.label : undefined;
    return (
        <Form>
            <Form.Group>
                <Form.Label>Trigger</Form.Label>
                <Form.Control
                    size="lg"
                    as="select"
                    defaultValue={ selectedName || '--' }
                    onChange={ (e) => onSelectTrigger(recipe, e.currentTarget.value) }
                >
                    <option disabled>--</option>
                    {
                        Object.entries(TRIGGERS).map(([key, Trigger]) => {
                            return (
                                <option key={ key } value={ key }>
                                    { Trigger.displayName }
                                </option>
                            );
                        })
                    }
                </Form.Control>
                <Form.Text>Some text.</Form.Text>
            </Form.Group>
        </Form>
    );
}
export default TriggerSelector;
