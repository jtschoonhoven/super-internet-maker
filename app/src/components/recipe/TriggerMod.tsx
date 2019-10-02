import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

import { BASE_TRIGGER, FILTER_GROUP } from '../../constants/triggers_constants';

const TriggerModWrapper = styled.div`
  padding: 1em;
  background: #FFA50A;
  text-align: center;
`;

interface STATE {
  trigger: BASE_TRIGGER;
}

function onAddFilterGroup(trigger: BASE_TRIGGER): void {
  const filterGroup = new FILTER_GROUP({ parent: trigger, operator: 'and' });
  trigger.addFilterGroup({ filterGroup });
}

const TriggerMod: React.FC<STATE> = ({ trigger }) => {
  return (
    <TriggerModWrapper>
      <Button variant="outline-primary" onClick={ () => { onAddFilterGroup(trigger) } }>
        Add Filter Group
      </Button>
    </TriggerModWrapper>
  );
}
export default TriggerMod;
