import React from 'react';

import { BASE_ACTION } from '../../constants/actions_constants';


interface STATE {
    action: BASE_ACTION;
}

const Action: React.FC<STATE> = ({ action }) => {
    return (<p>TODO: render action</p>);
};

export default Action;