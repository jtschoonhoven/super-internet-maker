import React from 'react';
import { TRIGGER_FILTER } from '../../constants/triggers_constants';

interface STATE {
    filter: TRIGGER_FILTER;
};

const Filter: React.FC<STATE> = ({ filter }) => {
    return <p>i is a filter</p>;
}
export default Filter;
