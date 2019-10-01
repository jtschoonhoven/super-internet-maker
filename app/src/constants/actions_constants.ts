import { SIM_BASE } from '.';
import { BASE_EVENT } from './events_constants';
import { FILTER_GROUP } from './triggers_constants';
import { NONE, SMS } from './events_constants';

const ACTIONS: { [name: string]: typeof BASE_ACTION } = {};
export default ACTIONS;

interface _BASE_ACTION {
  parent?: FILTER_GROUP;
  readonly label: string;
  readonly displayName: string;
  readonly type: typeof BASE_EVENT;
}

export class BASE_ACTION extends SIM_BASE implements _BASE_ACTION {
  parent?: FILTER_GROUP;
  static readonly label: string;
  static readonly displayName: string;
  static readonly type: typeof BASE_EVENT;
  // instance props match static props
  readonly label: string;
  readonly displayName: string;
  readonly type: typeof BASE_EVENT;

  // assign instance props from static props
  constructor({ parent }: { parent?: FILTER_GROUP }) {
      super();
      this.label = (this.constructor as typeof BASE_ACTION).label;
      this.displayName = (this.constructor as typeof BASE_ACTION).displayName;
      this.type = (this.constructor as typeof BASE_ACTION).type;
      this.parent = parent;
  }
}

export class ACTION_NONE extends BASE_ACTION {
  static label = 'none';
  static displayName = 'Do Nothing';
  static type = NONE;
}
ACTIONS[ACTION_NONE.label] = ACTION_NONE;

export class ACTION_SEND_SMS extends BASE_ACTION {
  static label = 'sendSMS';
  static displayName = 'Send Text Message';
  static type = SMS;
}
ACTIONS[ACTION_SEND_SMS.label] = ACTION_SEND_SMS;
