import React, { useState } from 'react';
import styled from 'styled-components';

import { BASE_TRIGGER, FILTER_GROUP } from '../../constants/triggers_constants';
import TriggerSelector from './TriggerSelector';
import RECIPE from '../../constants/recipe_constants';

const TriggerWrapper = styled.div`
  padding: 1em;
  background: #FFA50A;
  text-align: center;
`;

interface STATE {
  recipe: RECIPE;
}

function onAddFilterGroup(trigger: BASE_TRIGGER): void {
  const filterGroup = new FILTER_GROUP({ parent: trigger, operator: 'and' });
  trigger.addFilterGroup({ filterGroup });
}

const Trigger: React.FC<STATE> = ({ recipe }) => {
  return (
    <TriggerWrapper>
      <p>⚠️</p>
      <TriggerSelector recipe={ recipe } />
    </TriggerWrapper>
  );
  // if (!trigger) {
  //   return <p>Select a trigger to begin.</p>
  // }
  // const FilterGroups = trigger.filterGroups.map((filterGroup, index) => {
  //   return (<FilterGroup filterGroup={ filterGroup } key={ index } />);
  // });
  // return (
  //   <TriggerWrapper>
  //     <p>What happens next?</p>
  //     { FilterGroups }
  //     <Button variant="outline-primary" onClick={ () => { onAddFilterGroup(trigger) } }>
  //       Add Filter Group
  //     </Button>
  //   </TriggerWrapper>
  // );
}
export default Trigger;
