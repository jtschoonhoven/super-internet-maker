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
import { BASE_ACTION, ACTION_NONE } from './actions_constants';
import SIM_BASE from './base_constants';
import Trigger from '../components/recipe/Trigger';


const TRIGGERS: { [name: string]: typeof BASE_TRIGGER } = {};
export default TRIGGERS;

export class TRIGGER_FILTER extends SIM_BASE {
    parent?: FILTER_GROUP;
    readonly type: BASE_FILTER;
    readonly onField: typeof BASE_FIELD;

    constructor(
        { type, onField, parent }:
        {
            type: BASE_FILTER,
            onField: typeof BASE_FIELD,
            parent?: FILTER_GROUP,
        },
    ) {
        super();
        this.type = type;
        this.onField = onField;
        this.parent = parent;
    }
}

export class FILTER_GROUP extends SIM_BASE {
    parent?: BASE_TRIGGER | FILTER_GROUP;
    readonly condition: 'if' | 'elif' | 'else';
    readonly operator: 'and' | 'or';
    readonly filters: TRIGGER_FILTER[];
    readonly action: BASE_ACTION;
    readonly filterGroups: FILTER_GROUP[];

    constructor(
        { parent, condition, operator, filters, action, filterGroups }:
        {
            parent?: BASE_TRIGGER | FILTER_GROUP;
            condition?: 'if' | 'elif' | 'else';
            operator?: 'and' | 'or';
            filters?: TRIGGER_FILTER[];
            action?: BASE_ACTION;
            filterGroups?: FILTER_GROUP[];
        },
    ) {
        super();
        this.parent = parent;
        this.condition = condition || 'if';
        this.operator = operator || 'and';
        this.filters = filters || [];
        this.action = action || new ACTION_NONE({});
        this.filterGroups = filterGroups || [];
    }

    addFilter({ filter }: { filter: TRIGGER_FILTER }): FILTER_GROUP {
        if (!this.parent) {
            throw new Error('cannot add filter to filter group without a parent');
        }
        const newFilterGroup = new FILTER_GROUP({
            filters: [...this.filters, filter],
            action: this.action,
            filterGroups: this.filterGroups,
            operator: this.operator,
            parent: this.parent,
        });
        const parentIndex = this.parent.filterGroups.indexOf(this);
        this.parent.updateFilterGroup({ filterGroup: newFilterGroup, atIndex: parentIndex });
        return newFilterGroup;
    }

    updateFilterGroup({ filterGroup, atIndex }: { filterGroup: FILTER_GROUP, atIndex: number }): FILTER_GROUP {
        if (!this.parent) {
            throw new Error('cannot update filter in filter group without a parent');
        }
        const newFilterGroups = [...this.filterGroups];
        const newFilterGroup = new FILTER_GROUP({
            filters: this.filters,
            action: this.action,
            filterGroups: newFilterGroups,
            operator: this.operator,
            parent: this.parent,
        });
        const parentIndex = this.parent.filterGroups.indexOf(this);
        this.parent.updateFilterGroup({ filterGroup: newFilterGroup, atIndex: parentIndex });
        return newFilterGroup;
    }
}

interface _BASE_TRIGGER {
    parent?: RECIPE;
    readonly label: string;
    readonly displayName: string;
    readonly type: typeof BASE_EVENT;
    readonly filterGroups: FILTER_GROUP[];
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
    readonly filterGroups: FILTER_GROUP[];
    readonly actions: BASE_ACTION[];

    // assign instance props from static props
    constructor(
        { parent, filterGroups, actions }:
        { parent?: RECIPE, filterGroups?: FILTER_GROUP[], actions?: BASE_ACTION[] },
    ) {
        super();
        this.label = (this.constructor as typeof BASE_TRIGGER).label;
        this.displayName = (this.constructor as typeof BASE_TRIGGER).displayName;
        this.type = (this.constructor as typeof BASE_TRIGGER).type;
        this.parent = parent;
        this.filterGroups = [new FILTER_GROUP({ condition: 'if' })];
        this.actions = actions || [];
    }

    addFilterGroup({ filterGroup }: { filterGroup: FILTER_GROUP }): BASE_TRIGGER {
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

    updateFilterGroup({ filterGroup, atIndex }: { filterGroup: FILTER_GROUP, atIndex: number }): BASE_TRIGGER {
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
TRIGGERS[TRIGGER_SMS_RECEIVED.label] = TRIGGER_SMS_RECEIVED;

export class TRIGGER_VOICE_CALL_RECEIVED extends BASE_TRIGGER {
    static label = 'voiceCallReceived';
    static displayName = 'Receive Voice Call';
    static type = VOICE_CALL;
}
TRIGGERS[TRIGGER_VOICE_CALL_RECEIVED.label] = TRIGGER_VOICE_CALL_RECEIVED;

export class TRIGGER_USER_MODEL_UPDATED extends BASE_TRIGGER {
    static label = 'userModelUpdated';
    static displayName = 'User Property Changed';
    static type = USER_PROPERTY_CHANGE;
}
TRIGGERS[TRIGGER_USER_MODEL_UPDATED.label] = TRIGGER_USER_MODEL_UPDATED;

export class TRIGGER_USER_LOGIN_SUCCEEDED extends BASE_TRIGGER {
    static label = 'userLoginSucceeded';
    static displayName = 'User Logged In';
    static type = USER_PROPERTY_CHANGE;
}
TRIGGERS[TRIGGER_USER_LOGIN_SUCCEEDED.label] = TRIGGER_USER_LOGIN_SUCCEEDED;

export class TRIGGER_EMAIL_RECEIVED extends BASE_TRIGGER {
    static label = 'emailReceived';
    static displayName = 'Receive Email';
    static type = EMAIL;
}
TRIGGERS[TRIGGER_EMAIL_RECEIVED.label] = TRIGGER_EMAIL_RECEIVED;

export class TRIGGER_GIT_BRANCH_UPDATED extends BASE_TRIGGER {
    static label = 'gitBranchUpdated';
    static displayName = 'Git Branch Updated';
    static type = COMMIT;
}
TRIGGERS[TRIGGER_GIT_BRANCH_UPDATED.label] = TRIGGER_GIT_BRANCH_UPDATED;

export class TRIGGER_CALENDAR_EVENT_STARTED extends BASE_TRIGGER {
    static label = 'calendarEventStarted';
    static displayName = 'Calendar Event Started';
    static type = CALENDAR_EVENT;
}
TRIGGERS[TRIGGER_CALENDAR_EVENT_STARTED.label] = TRIGGER_CALENDAR_EVENT_STARTED;
