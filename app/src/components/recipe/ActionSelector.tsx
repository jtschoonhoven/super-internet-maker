import React from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';

import { FILTER_GROUP } from '../../constants/triggers_constants';
import ACTIONS from '../../constants/actions_constants';

const ActionSelectorWrapper = styled.div``;

interface STATE {
    filterGroup: FILTER_GROUP;
}

function onSelectAction(filterGroup: FILTER_GROUP, actionLabel?: string): void {
    if (!actionLabel) {
        return;
    }
    console.log('ON SELECT ACTION');
}

const ActionSelector: React.FC<STATE> = ({ filterGroup }) => {
    const ActionOptions = Object.values(ACTIONS).map((Action) => {
        return (
            <option key={ Action.label } value={ Action.label }>{ Action.displayName }</option>
        );
    })
    return (
        <ActionSelectorWrapper>
            <Form.Group>
                <h3>Then do this...</h3>
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
