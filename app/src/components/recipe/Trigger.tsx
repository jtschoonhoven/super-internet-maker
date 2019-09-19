import React, { useState } from 'react';
import FilterGroup from './FilterGroup';
import Button from 'react-bootstrap/Button';
import { BASE_TRIGGER, TRIGGER_FILTER_GROUP } from '../../constants/triggers_constants';

interface STATE {
  trigger?: BASE_TRIGGER;
}

function onAddFilterGroup(trigger: BASE_TRIGGER): void {
  const filterGroup = new TRIGGER_FILTER_GROUP({ parent: trigger, operator: 'and' });
  trigger.addFilterGroup({ filterGroup });
}

const Trigger: React.FC<STATE> = ({ trigger }) => {
  if (!trigger) {
    return <p>TODO: No trigger selected.</p>
  }
  const FilterGroups = trigger.filterGroups.map((filterGroup, index) => {
    return (<FilterGroup filterGroup={ filterGroup } key={ index } />);
  });
  return (
    <div>
      <Button variant="outline-primary" onClick={ () => { onAddFilterGroup(trigger) } }>
        Add Filter Group
      </Button>
      { FilterGroups }
    </div>
  );
}
export default Trigger;
