import React from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';

import ACTIONS, { BASE_ACTION } from '../../constants/actions_constants';

const ActionSelectorWrapper = styled.div``;

interface STATE {
    action: BASE_ACTION;
}

function onSelectAction(oldAction: BASE_ACTION, actionLabel?: string): void {
    if (!actionLabel) {
        throw new Error('selected action has no label');
    }
    if (oldAction.label === actionLabel) {
        return;
    }
    const newAction: BASE_ACTION = new ACTIONS[actionLabel]({ parent: oldAction.parent });
    oldAction.replaceWith({ action: newAction });
}

const ActionSelector: React.FC<STATE> = ({ action }) => {
    const ActionOptions = Object.values(ACTIONS).map((Action) => {
        return (
            <option key={ Action.label } value={ Action.label }>{ Action.displayName }</option>
        );
    })
    return (
        <ActionSelectorWrapper>
            <p>Select Action</p>
            <Form.Group>
                <Form.Control
                    size="lg"
                    as="select"
                    defaultValue={ action.displayName || '--' }
                    onChange={ (e) => onSelectAction(action, e.currentTarget.value) }
                >
                    { ActionOptions }
                </Form.Control>
            </Form.Group>
        </ActionSelectorWrapper>
    );
}

export default ActionSelector;
