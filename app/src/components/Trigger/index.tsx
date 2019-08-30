import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';

import TRIGGERS from '../../constants/triggers';


export default () => {
  const [triggerName, setTriggerName] = useState('');
  return (
    <Form>
      <Form.Group>
        <Form.Label>Trigger</Form.Label>
        <Form.Control
          size="lg"
          as="select"
          value={triggerName || '--'}
          onChange={(e) => setTriggerName(e.currentTarget.value || '')
          }>
          <option disabled>--</option>
          {Object.entries(TRIGGERS).map(([key, Trigger]) => {
            return (<option key={key} value={key}>{Trigger.displayName}</option>)
          })}
        </Form.Control>
        <Form.Text>This is where it all starts.</Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label column sm="2">
          You selected...
          </Form.Label>
        <Form.Control plaintext readOnly size="lg" defaultValue={triggerName} />
      </Form.Group>
      <ButtonToolbar>
        <Button variant="primary">Add Filter</Button>
        <Button variant="secondary">Add Action</Button>
      </ButtonToolbar>
    </Form>
  );
}
