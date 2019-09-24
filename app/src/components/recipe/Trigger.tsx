import React, { useState } from 'react';
import styled from 'styled-components';
import FilterGroup from './FilterGroup';
import Button from 'react-bootstrap/Button';
import { BASE_TRIGGER, FILTER_GROUP } from '../../constants/triggers_constants';

const TriggerWrapper = styled.div`
  padding: 1em;
  background: #FFA50A;
`;

interface STATE {
  trigger?: BASE_TRIGGER;
}

function onAddFilterGroup(trigger: BASE_TRIGGER): void {
  const filterGroup = new FILTER_GROUP({ parent: trigger, operator: 'and' });
  trigger.addFilterGroup({ filterGroup });
}

const Trigger: React.FC<STATE> = ({ trigger }) => {
  if (!trigger) {
    return <p>Select a trigger to begin.</p>
  }
  const FilterGroups = trigger.filterGroups.map((filterGroup, index) => {
    return (<FilterGroup filterGroup={ filterGroup } key={ index } />);
  });
  return (
    <TriggerWrapper>
      <p>What happens next?</p>
      { FilterGroups }
      <Button variant="outline-primary" onClick={ () => { onAddFilterGroup(trigger) } }>
        Add Filter Group
      </Button>
    </TriggerWrapper>
  );
}
export default Trigger;
