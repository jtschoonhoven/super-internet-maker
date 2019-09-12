import {
    BASE_EVENT,
    SMS,
    VOICE_CALL,
    USER_PROPERTY_CHANGE,
    EMAIL,
    COMMIT,
    CALENDAR_EVENT,
} from './events_constants';
import RECIPE from './recipe_constants';
import { BASE_FILTER } from './filters_constants';
import { BASE_FIELD } from './fields_constants';
import { BASE_ACTION } from './actions_constants';

type _UUID_MAP = { [uuid: string]: TRIGGER_FILTER };
const TRIGGERS: { [name: string]: typeof BASE_TRIGGER } = {};
export default TRIGGERS;

export class TRIGGER_FILTER {
    readonly type: BASE_FILTER;
    readonly onField: BASE_FIELD;
    readonly filters: TRIGGER_FILTER_GROUP;
    readonly actions: TRIGGER_ACTION_GROUP;
    readonly parent: TRIGGER_FILTER_GROUP;

    constructor({ type, onField, filters, actions, parent }: TRIGGER_FILTER) {
        this.type = type;
        this.onField = onField;
        this.filters = filters;
        this.actions = actions;
        this.parent = parent;
    }
}

export class TRIGGER_FILTER_GROUP {
    readonly and: _UUID_MAP;
    readonly or: _UUID_MAP;
    readonly parent: BASE_TRIGGER | TRIGGER_FILTER_GROUP;

    constructor(
        { and, or, parent }:
            { and?: _UUID_MAP, or?: _UUID_MAP, parent: BASE_TRIGGER | TRIGGER_FILTER_GROUP },
    ) {
        this.and = and || {};
        this.or = or || {};
        this.parent = parent;
    }
}

export class TRIGGER_ACTION {
    readonly type: BASE_ACTION;

    constructor({ type }: TRIGGER_ACTION) {
        this.type = type;
    }
}

export class TRIGGER_ACTION_GROUP {
    readonly actions: _UUID_MAP;
    readonly parent: BASE_TRIGGER;

    constructor({ actions, parent }: { actions: _UUID_MAP, parent: BASE_TRIGGER }) {
        this.actions = actions || {};
        this.parent = parent;
    }
}

interface _BASE_TRIGGER {
    readonly label: string;
    readonly displayName: string;
    readonly type: typeof BASE_EVENT;
    readonly parent: RECIPE;
    readonly filters: TRIGGER_FILTER_GROUP;
    readonly actions: TRIGGER_ACTION[];
}

export class BASE_TRIGGER implements _BASE_TRIGGER {
    static readonly label: string;
    static readonly displayName: string;
    static readonly type: typeof BASE_EVENT;
    // instance props match static props
    readonly label: string;
    readonly displayName: string;
    readonly type: typeof BASE_EVENT;
    readonly parent: RECIPE;
    readonly filters: TRIGGER_FILTER_GROUP;
    readonly actions: TRIGGER_ACTION[];

    // assign instance props from static props
    constructor(
        { parent, filters, actions }:
            { parent: RECIPE, filters?: TRIGGER_FILTER_GROUP, actions?: TRIGGER_ACTION[] },
    ) {
        this.label = (this.constructor as typeof BASE_TRIGGER).label;
        this.displayName = (this.constructor as typeof BASE_TRIGGER).displayName;
        this.type = (this.constructor as typeof BASE_TRIGGER).type;
        this.parent = parent;
        this.filters = filters || new TRIGGER_FILTER_GROUP({ parent: this });
        this.actions = actions || [];
    }
}

export class TRIGGER_SMS_RECEIVED extends BASE_TRIGGER {
    static label = 'smsReceived';
    static displayName = 'Receive SMS';
    static type = SMS;
}
TRIGGERS[TRIGGER_SMS_RECEIVED.name] = TRIGGER_SMS_RECEIVED;

export class TRIGGER_VOICE_CALL_RECEIVED extends BASE_TRIGGER {
    static label = 'voiceCallReceived';
    static displayName = 'Receive Voice Call';
    static type = VOICE_CALL;
}
TRIGGERS[TRIGGER_VOICE_CALL_RECEIVED.name] = TRIGGER_VOICE_CALL_RECEIVED;

export class TRIGGER_USER_MODEL_UPDATED extends BASE_TRIGGER {
    static label = 'userModelUpdated';
    static displayName = 'User Property Changed';
    static type = USER_PROPERTY_CHANGE;
}
TRIGGERS[TRIGGER_USER_MODEL_UPDATED.name] = TRIGGER_USER_MODEL_UPDATED;

export class TRIGGER_USER_LOGIN_SUCCEEDED extends BASE_TRIGGER {
    static label = 'userLoginSucceeded';
    static displayName = 'User Logged In';
    static type = USER_PROPERTY_CHANGE;
}
TRIGGERS[TRIGGER_USER_LOGIN_SUCCEEDED.name] = TRIGGER_USER_LOGIN_SUCCEEDED;

export class TRIGGER_EMAIL_RECEIVED extends BASE_TRIGGER {
    static label = 'emailReceived';
    static displayName = 'Receive Email';
    static type = EMAIL;
}
TRIGGERS[TRIGGER_EMAIL_RECEIVED.name] = TRIGGER_EMAIL_RECEIVED;

export class TRIGGER_GIT_BRANCH_UPDATED extends BASE_TRIGGER {
    static label = 'gitBranchUpdated';
    static displayName = 'Git Branch Updated';
    static type = COMMIT;
}
TRIGGERS[TRIGGER_GIT_BRANCH_UPDATED.name] = TRIGGER_GIT_BRANCH_UPDATED;

export class TRIGGER_CALENDAR_EVENT_STARTED extends BASE_TRIGGER {
    static label = 'calendarEventStarted';
    static displayName = 'Calendar Event Started';
    static type = CALENDAR_EVENT;
}
TRIGGERS[TRIGGER_CALENDAR_EVENT_STARTED.name] = TRIGGER_CALENDAR_EVENT_STARTED;
