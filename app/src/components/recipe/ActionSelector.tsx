import React from 'react';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { TRIGGER_FILTER_GROUP } from '../../constants/triggers_constants';
import ACTIONS from '../../constants/actions_constants';

const ActionSelectorWrapper = styled.div``;

interface STATE {
    filterGroup: TRIGGER_FILTER_GROUP;
}

function onSelectAction(filterGroup: TRIGGER_FILTER_GROUP, actionLabel?: string): void {
    if (!actionLabel) {
        return;
    }
    console.log('ON SELECT ACTION');
}

const ActionSelector: React.FC<STATE> = ({ filterGroup }) => {
    const actions = filterGroup.getCompatibleActions();
    const ActionOptions = actions.map((Action) => {
        return (
            <option key={ Action.label } value={ Action.label }>
                { Action.displayName }
            </option>
        );
    })
    return (
        <ActionSelectorWrapper>
            <Form.Group>
                <Form.Label>What should it do</Form.Label>
                <Form.Control
                    size="lg"
                    as="select"
                    defaultValue={ filterGroup.action.displayName || '--' }
                    onChange={ (e) => onSelectAction(filterGroup, e.currentTarget.value) }
                >
                    { ActionOptions }
                </Form.Control>
            </Form.Group>
        </ActionSelectorWrapper>
    );
}

export default ActionSelector;