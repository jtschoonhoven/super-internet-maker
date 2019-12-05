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
  trigger: BASE_TRIGGER | FILTER_GROUP;
}

function onAddFilterGroup(parent: BASE_TRIGGER | FILTER_GROUP): void {
  const filterGroup = new FILTER_GROUP({ parent: parent, operator: 'and' });
  parent.addFilterGroup({ filterGroup });
}

const TriggerMod: React.FC<STATE> = ({ trigger }) => {
  return (
    <TriggerModWrapper>
      <Button variant="outline-primary" onClick={ () => { onAddFilterGroup(trigger) } }>
        +
      </Button>
    </TriggerModWrapper>
  );
}
export default TriggerMod;
