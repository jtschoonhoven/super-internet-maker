import React, { useState } from 'react';
import styled from 'styled-components';

import FilterGroup from './FilterGroup';
import IngredientWrapper from './IngredientWrapper';
import { RECIPE } from '../../constants';

const TriggerWrapper = styled.div``;

interface Props {
  recipe: RECIPE;
}

// function onAddFilterGroup(trigger: BASE_TRIGGER): void {
//   const filterGroup = new FILTER_GROUP({ parent: trigger, operator: 'and' });
//   trigger.addFilterGroup({ filterGroup });
// }

const Trigger: React.FC<Props> = ({ recipe }) => {
  const trigger = recipe.trigger;
  let FilterGroups: Array<React.ReactElement> = [];
  if (trigger) {
    FilterGroups = trigger.filterGroups.map((filterGroup, index) => {
      return <FilterGroup filterGroup={ filterGroup } key={ index } />;
    });
  }
  const label = `Trigger: ${ trigger ? trigger.displayName : 'Select a trigger' }`;
  return (
    <TriggerWrapper>
      <IngredientWrapper label={ label } ingredient={ recipe }></IngredientWrapper>
      { FilterGroups }
    </TriggerWrapper>
  );
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
