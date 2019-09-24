import React from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';

import TRIGGERS, { BASE_TRIGGER, FILTER_GROUP } from '../../constants/triggers_constants';
import RECIPE from '../../constants/recipe_constants';

const TriggerSelectorWrapper = styled.div``;

interface STATE {
    recipe: RECIPE;
}

function onSelectTrigger(recipe: RECIPE, triggerName: string | undefined): void {
    if (!triggerName) {
        return;
    }
    const filterGroup = new FILTER_GROUP({ operator: 'and' });
    const trigger: BASE_TRIGGER = new TRIGGERS[triggerName]({ filterGroups: [filterGroup] });
    recipe.updateTrigger({ trigger });
}

const TriggerSelector: React.FC<STATE> = ({ recipe }) => {
    let selectedName = recipe.trigger ? recipe.trigger.label : undefined;
    const TRIGGER_OPTIONS = Object.entries(TRIGGERS).map(([key, Trigger]) => {
        return (
            <option key={ key } value={ key }>
                { Trigger.displayName }
            </option>
        );
    })
    return (
        <TriggerSelectorWrapper>
            <Form.Group>
                <Form.Label>Select a Trigger</Form.Label>
                <Form.Control
                    size="lg"
                    as="select"
                    defaultValue={ selectedName || '--' }
                    onChange={ (e) => onSelectTrigger(recipe, e.currentTarget.value) }
                >
                    <option disabled>--</option>
                    { TRIGGER_OPTIONS }
                </Form.Control>
            </Form.Group>
        </TriggerSelectorWrapper>
    );
}
export default TriggerSelector;
