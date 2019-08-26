import React, { useState } from 'react';
import './App.css';
import get from 'lodash/get';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';  


class User {} // TODO

class _TRIGGER_FIELD {
  static readonly type: string;
  static readonly value: any;
}

class _FIELD_USER_IDENTIFIER extends _TRIGGER_FIELD {
  static readonly type: 'userId' | 'phoneNumber' | 'emailAddress';
  static readonly value: string;
  static readonly userModel?: User;

  getUser() {} // TODO
  getOrCreateUser() {} // TODO
}

class FIELD_PHONE_NUMBER extends _FIELD_USER_IDENTIFIER {
  type = 'phoneNumber';
}

class FIELD_EMAIL_ADDRESS extends _FIELD_USER_IDENTIFIER {
  type = 'emailAddress';
}

class FIELD_TEXT_FREE extends _TRIGGER_FIELD {
  type = 'text';
  static readonly value: string;
}

class FIELD_TEXT_LABEL extends _TRIGGER_FIELD {
  type = 'name';
  static readonly value: string;
}

class FIELD_BLOB extends _TRIGGER_FIELD {
  type = 'blob';
  static readonly mimeType: 'image/jpeg' | 'image/png';
  static readonly value: string;
}

class FIELD_TIMESTAMP_MS extends _TRIGGER_FIELD {
  type = 'timestampMs';
  static readonly value: number;
}

class _OBJECT_TYPE {}

class SMS implements _OBJECT_TYPE {
  static readonly toPhoneNumber: FIELD_PHONE_NUMBER;
  static readonly fromPhoneNumber: FIELD_PHONE_NUMBER;
  static readonly messageText: FIELD_TEXT_FREE;
  static readonly messageBlob?: FIELD_BLOB;
}

class VOICE_CALL implements _OBJECT_TYPE {
  static readonly toPhoneNumber: FIELD_PHONE_NUMBER;
  static readonly fromPhoneNumber: FIELD_PHONE_NUMBER;
}

class USER_PROPERTY_CHANGE implements _OBJECT_TYPE {
  static readonly property: FIELD_TEXT_LABEL;
  static readonly oldValue: any;
  static readonly newValue: any;
}

class EMAIL implements _OBJECT_TYPE {
  static readonly toEmail: FIELD_EMAIL_ADDRESS;
  static readonly fromEmail: FIELD_EMAIL_ADDRESS;
  static readonly messageText: FIELD_TEXT_FREE;
}

class COMMIT implements _OBJECT_TYPE {
  static readonly authorName: FIELD_TEXT_LABEL;
  static readonly sha: FIELD_TEXT_LABEL;
}

class CALENDAR_EVENT implements _OBJECT_TYPE {
  static readonly eventName: FIELD_TEXT_FREE;
  static readonly eventDescription: FIELD_TEXT_FREE;
  static readonly startTimestampMS: FIELD_TIMESTAMP_MS;
  static readonly endTimestampMs: FIELD_TIMESTAMP_MS;
}

interface _TRIGGER {
  readonly displayName: string;
  readonly type: _OBJECT_TYPE;
}

interface _ACTION {
  readonly displayName: string;
  readonly type: _OBJECT_TYPE;
}

class TRIGGERS {
  static readonly smsReceived: _TRIGGER = {
    displayName: 'Receive SMS',
    type: SMS,
  };
  static readonly voiceCallReceived: _TRIGGER = {
    displayName: 'Receive Voice Call',
    type: VOICE_CALL,
  };
  static readonly userModelUpdated: _TRIGGER = {
    displayName: 'User Property Changed',
    type: USER_PROPERTY_CHANGE,
  };
  static readonly userLoginSucceeded: _TRIGGER = {
    displayName: 'User Logged In',
    type: USER_PROPERTY_CHANGE,
  };
  static readonly emailReceived: _TRIGGER = {
    displayName: 'Receive Email',
    type: EMAIL,
  };
  static readonly gitBranchUpdated: _TRIGGER = {
    displayName: 'Git Branch Updated',
    type: COMMIT,
  };
  static readonly calendarEventStarted: _TRIGGER = {
    displayName: 'Calendar Event Started',
    type: CALENDAR_EVENT,
  }
}

class ACTIONS {
  static readonly smsSend: _ACTION = {
    displayName: 'Send SMS',
    type: SMS,
  }
}

class _TRIGGER_FILTER {
  static readonly onField: _TRIGGER_FIELD;
  static readonly filters: _TRIGGER_FILTER[];
  static readonly actions: _TRIGGER_ACTION[];
}

class _TRIGGER_ACTION {
  static readonly type: _ACTION;
}

class STATE {
  static readonly trigger: _TRIGGER;
  static readonly filters: _TRIGGER_FILTER[] = [];
  static readonly actions: _TRIGGER_ACTION[] = [];
}


const App: React.FC = () => {
  const [triggerName, setTriggerName] = useState('');

  return (
      <Container className="App">
        <Row>
          <Col>
          <Form>
            <Form.Group>
              <Form.Label>Trigger</Form.Label>
              <Form.Control
                size="lg"
                as="select"
                value={ triggerName || '--' }
                onChange={ (e) => setTriggerName(e.currentTarget.value || '')
              }>
                <option disabled>--</option>
                { Object.entries(TRIGGERS).map(([key, Trigger]) => {
                  return (<option key={ key } value={ key }>{ Trigger.displayName }</option>)
                }) }
              </Form.Control>
              <Form.Text>This is where it all starts.</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label column sm="2">
                You selected...
              </Form.Label>
                <Form.Control plaintext readOnly size="lg" defaultValue={ triggerName } />
            </Form.Group>
            <ButtonToolbar>
              <Button variant="primary">Add Filter</Button>
              <Button variant="secondary">Add Action</Button>
            </ButtonToolbar>
          </Form>
          </Col>
        </Row>
      </Container>
  );
}

export default App;
