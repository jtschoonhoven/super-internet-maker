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
import SIM_BASE from './base_constants';
import Trigger from '../components/recipe/Trigger';


const TRIGGERS: { [name: string]: typeof BASE_TRIGGER } = {};
export type FILTERABLE = TRIGGER_FILTER | TRIGGER_FILTER_GROUP;
export default TRIGGERS;

export class TRIGGER_FILTER extends SIM_BASE {
    parent?: TRIGGER_FILTER_GROUP;
    readonly type: BASE_FILTER;
    readonly onField: typeof BASE_FIELD;

    constructor(
        { type, onField, parent }:
        {
            type: BASE_FILTER,
            onField: typeof BASE_FIELD,
            parent?: TRIGGER_FILTER_GROUP,
        },
    ) {
        super();
        this.type = type;
        this.onField = onField;
        this.parent = parent;
    }
}

export class TRIGGER_FILTER_GROUP extends SIM_BASE {
    parent?: BASE_TRIGGER | TRIGGER_FILTER_GROUP;
    readonly operator: 'and' | 'or';
    readonly filters: TRIGGER_FILTER[];
    readonly actions: TRIGGER_ACTION[];
    readonly filterGroups: TRIGGER_FILTER_GROUP[];

    constructor(
        { filters, actions, filterGroups, operator, parent }:
        {
            filters?: TRIGGER_FILTER[],
            actions?: TRIGGER_ACTION[],
            filterGroups?: TRIGGER_FILTER_GROUP[],
            operator: 'and' | 'or',
            parent?: BASE_TRIGGER | TRIGGER_FILTER_GROUP,
        },
    ) {
        super();
        this.filters = filters || [];
        this.actions = actions || [];
        this.filterGroups = filterGroups || [];
        this.operator = operator;
        this.parent = parent;
    }

    addFilter({ filter }: { filter: TRIGGER_FILTER }): TRIGGER_FILTER_GROUP {
        if (!this.parent) {
            throw new Error('cannot add filter to filter group without a parent');
        }
        const newFilterGroup = new TRIGGER_FILTER_GROUP({
            filters: [...this.filters, filter],
            actions: this.actions,
            filterGroups: this.filterGroups,
            operator: this.operator,
            parent: this.parent,
        });
        const parentIndex = this.parent.filterGroups.indexOf(this);
        this.parent.updateFilterGroup({ filterGroup: newFilterGroup, atIndex: parentIndex });
        return newFilterGroup;
    }

    updateFilterGroup({ filterGroup, atIndex }: { filterGroup: TRIGGER_FILTER_GROUP, atIndex: number }): TRIGGER_FILTER_GROUP {
        if (!this.parent) {
            throw new Error('cannot update filter in filter group without a parent');
        }
        const newFilterGroups = [...this.filterGroups];
        const newFilterGroup = new TRIGGER_FILTER_GROUP({
            filters: this.filters,
            actions: this.actions,
            filterGroups: newFilterGroups,
            operator: this.operator,
            parent: this.parent,
        });
        const parentIndex = this.parent.filterGroups.indexOf(this);
        this.parent.updateFilterGroup({ filterGroup: newFilterGroup, atIndex: parentIndex });
        return newFilterGroup;
    }
}

export class TRIGGER_ACTION extends SIM_BASE {
    parent: BASE_TRIGGER | FILTERABLE;
    readonly type: BASE_ACTION;

    constructor({ type, parent }: TRIGGER_ACTION) {
        super();
        this.parent = parent;
        this.type = type;
    }
}

interface _BASE_TRIGGER {
    parent?: RECIPE;
    readonly label: string;
    readonly displayName: string;
    readonly type: typeof BASE_EVENT;
    readonly filterGroups: TRIGGER_FILTER_GROUP[];
    readonly actions: BASE_ACTION[];
}

export class BASE_TRIGGER extends SIM_BASE implements _BASE_TRIGGER {
    parent?: RECIPE;
    static readonly label: string;
    static readonly displayName: string;
    static readonly type: typeof BASE_EVENT;
    // instance props match static props
    readonly label: string;
    readonly displayName: string;
    readonly type: typeof BASE_EVENT;
    // instance-only props
    readonly filterGroups: TRIGGER_FILTER_GROUP[];
    readonly actions: BASE_ACTION[];

    // assign instance props from static props
    constructor(
        { parent, filterGroups, actions }:
        { parent?: RECIPE, filterGroups?: TRIGGER_FILTER_GROUP[], actions?: BASE_ACTION[] },
    ) {
        super();
        this.label = (this.constructor as typeof BASE_TRIGGER).label;
        this.displayName = (this.constructor as typeof BASE_TRIGGER).displayName;
        this.type = (this.constructor as typeof BASE_TRIGGER).type;
        this.parent = parent;
        this.filterGroups = filterGroups || [];
        this.actions = actions || [];
    }

    addFilterGroup({ filterGroup }: { filterGroup: TRIGGER_FILTER_GROUP }): BASE_TRIGGER {
        if (!this.parent) {
            throw new Error('cannot add filter group to trigger without parent');
        }
        const Trigger = (this.constructor as typeof BASE_TRIGGER);
        const newTrigger = new Trigger({
            parent: this.parent,
            filterGroups: [...this.filterGroups, filterGroup],
            actions: this.actions,
        });
        this.parent.updateTrigger({ trigger: newTrigger });
        return newTrigger;
    }

    updateFilterGroup({ filterGroup, atIndex }: { filterGroup: TRIGGER_FILTER_GROUP, atIndex: number }): BASE_TRIGGER {
        if (!this.parent) {
            throw new Error('cannot update filter group in trigger without parent');
        }
        const Trigger = (this.constructor as typeof BASE_TRIGGER);
        const newFilterGroups = [...this.filterGroups];
        newFilterGroups[atIndex] = filterGroup;
        const newTrigger = new Trigger({
            parent: this.parent,
            filterGroups: newFilterGroups,
            actions: this.actions,
        });
        this.parent.updateTrigger({ trigger: newTrigger });
        return newTrigger;
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
