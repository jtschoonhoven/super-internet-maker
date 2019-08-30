import { BASE_EVENT, SMS } from './events';
import { BASE_FIELD } from './fields';


export interface BASE_ACTION {
  readonly displayName: string;
  readonly type: BASE_EVENT;
}

interface _ACTIONS {
  smsSend: BASE_ACTION;
}

const ACTIONS: _ACTIONS = {
  smsSend: {
    displayName: 'Send SMS',
    type: SMS,
  }
};
export default ACTIONS;
