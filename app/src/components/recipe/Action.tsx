import React from 'react';
import styled from 'styled-components';

import { BASE_ACTION } from '../../constants/actions_constants';
import ActionSelector from './ActionSelector';


const ActionWrapper = styled.div`
    text-align: center;
    padding: 1em;
    background: #FFDE07;
`;

interface STATE {
    action: BASE_ACTION;
}

const Action: React.FC<STATE> = ({ action }) => {
    return (
        <ActionWrapper>
            <p>❗</p>
            <ActionSelector action={ action }></ActionSelector>
        </ActionWrapper>
    );
};

export default Action;
