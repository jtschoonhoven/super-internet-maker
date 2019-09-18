import React, { useState } from 'react';
import FilterGroup from './FilterGroup';
import { BASE_TRIGGER } from '../../constants/triggers_constants';
import FilterSelector from './FilterSelector';

interface STATE {
  trigger?: BASE_TRIGGER;
}

function onAddFilter(): void {}

const Trigger: React.FC<STATE> = ({ trigger }) => {
  if (!trigger) {
    return <p>TODO: No trigger selected.</p>
  }
  return (
    <div>
      <FilterGroup filterGroup={ trigger.filterGroup } />
      <FilterSelector trigger={ trigger } />
    </div>
  );
}
export default Trigger;
