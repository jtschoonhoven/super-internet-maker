import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

import { BASE_ACTION } from '../../constants/actions_constants';


const ActionModWrapper = styled.div`
    text-align: center;
    padding: 1em;
    background: #FFDE07;
    margin-bottom: 0;
`;

interface STATE {
    action: BASE_ACTION;
}

function onAddFilter(action: BASE_ACTION): void {
    // TODO
}

const ActionMod: React.FC<STATE> = ({ action }) => {
    return (
        <ActionModWrapper>
            <Button variant="outline-primary" onClick={() => { onAddFilter(action) }}>
                +
            </Button>
        </ActionModWrapper>
    );
};

export default ActionMod;
