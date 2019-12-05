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
import { SIM_BASE } from '.';


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
    readonly operator: 'and' | 'or';
    readonly filters: TRIGGER_FILTER[];
    readonly actions: BASE_ACTION[];
    readonly filterGroups: FILTER_GROUP[];
    readonly filterGroupElse?: FILTER_GROUP;

    constructor(
        { parent, operator, filters, actions, filterGroups, filterGroupElse }:
        {
            parent?: BASE_TRIGGER | FILTER_GROUP;
            operator?: 'and' | 'or';
            filters?: TRIGGER_FILTER[];
            actions?: BASE_ACTION[];
            filterGroups?: FILTER_GROUP[];
            filterGroupElse?: FILTER_GROUP;
        },
    ) {
        super();
        this.parent = parent;
        this.operator = operator || 'and';
        this.filters = filters || [];
        this.actions = actions || [new ACTION_NONE({})];
        this.filterGroups = filterGroups || [];
        this.filterGroupElse = filterGroupElse;
    }

    addFilter({ filter }: { filter: TRIGGER_FILTER }): FILTER_GROUP {
        if (!this.parent) {
            throw new Error('cannot add filter to filter group without a parent');
        }
        const newFilterGroup = new FILTER_GROUP({
            filters: [...this.filters, filter],
            actions: this.actions,
            filterGroups: this.filterGroups,
            operator: this.operator,
            parent: this.parent,
        });
        return this.replaceWith({ filterGroup: newFilterGroup });
    }

    addAction({ action }: { action: BASE_ACTION }): FILTER_GROUP {
        if (!this.parent) {
            throw new Error('cannot add action to filter group without a parent');
        }
        const newFilterGroup = new FILTER_GROUP({
            filters:this.filters,
            actions: [...this.actions, action],
            filterGroups: this.filterGroups,
            operator: this.operator,
            parent: this.parent,
        });
        return this.replaceWith({ filterGroup: newFilterGroup });
    }

    updateAction({ action, atIndex }: { action: BASE_ACTION, atIndex: number }): FILTER_GROUP {
        if (!this.parent) {
            throw new Error('cannot update action on filter group without a parent');
        }
        const newActions = [...this.actions];
        newActions[atIndex] = action;
        const newFilterGroup = new FILTER_GROUP({
            filters: this.filters,
            actions: newActions,
            filterGroups: this.filterGroups,
            operator: this.operator,
            parent: this.parent,
        });
        return this.replaceWith({ filterGroup: newFilterGroup });
    }

    replaceWith({ filterGroup }: { filterGroup: FILTER_GROUP }): FILTER_GROUP {
        if (!this.parent) {
            throw new Error('cannot replace filter group without a parent');
        }
        const atIndex = this.parent.filterGroups.indexOf(this);
        this.parent.updateFilterGroup({ filterGroup, atIndex });
        return filterGroup;
    }

    updateFilterGroup({ filterGroup, atIndex }: { filterGroup: FILTER_GROUP, atIndex: number }): FILTER_GROUP {
        if (!this.parent) {
            throw new Error('cannot update filter group without a parent');
        }
        const newFilterGroups = [...this.filterGroups];
        newFilterGroups[atIndex] = filterGroup;
        const newFilterGroup = new FILTER_GROUP({
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

    addFilterGroup({ filterGroup }: { filterGroup: FILTER_GROUP }): FILTER_GROUP {
        if (!this.parent) {
            throw new Error('cannot add filter group to filter group without parent');
        }
        const FilterGroup = (this.constructor as typeof FILTER_GROUP);
        const newFilterGroup = new FilterGroup({
            parent: this.parent,
            filterGroups: [...this.filterGroups, filterGroup],
        });
        const atIndex = this.parent.filterGroups.indexOf(this);
        this.parent.updateFilterGroup({ filterGroup: newFilterGroup, atIndex });
        return newFilterGroup;
    }
}

interface _BASE_TRIGGER {
    parent?: RECIPE;
    readonly label: string;
    readonly displayName: string;
    readonly type: typeof BASE_EVENT;
    readonly filterGroups: FILTER_GROUP[];
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

    // assign instance props from static props
    constructor(
        { parent, filterGroups }:
        { parent?: RECIPE, filterGroups?: FILTER_GROUP[] },
    ) {
        super();
        this.label = (this.constructor as typeof BASE_TRIGGER).label;
        this.displayName = (this.constructor as typeof BASE_TRIGGER).displayName;
        this.type = (this.constructor as typeof BASE_TRIGGER).type;
        this.parent = parent;
        this.filterGroups = filterGroups || [new FILTER_GROUP({})];
    }

    addFilterGroup({ filterGroup }: { filterGroup: FILTER_GROUP }): BASE_TRIGGER {
        if (!this.parent) {
            throw new Error('cannot add filter group to trigger without parent');
        }
        const Trigger = (this.constructor as typeof BASE_TRIGGER);
        const newTrigger = new Trigger({
            parent: this.parent,
            filterGroups: [...this.filterGroups, filterGroup],
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
        });
        this.parent.updateTrigger({ trigger: newTrigger });
        return newTrigger;
    }

    replaceWith({ trigger }: { trigger: BASE_TRIGGER }): BASE_TRIGGER {
        if (!this.parent) {
            throw new Error('cannot replace trigger without parent');
        }
        return this.parent.updateTrigger({ trigger });
    }
}

class TRIGGER_SMS_RECEIVED extends BASE_TRIGGER {
    static label = 'smsReceived';
    static displayName = 'Receive SMS';
    static type = SMS;
}
TRIGGERS[TRIGGER_SMS_RECEIVED.label] = TRIGGER_SMS_RECEIVED;

class TRIGGER_VOICE_CALL_RECEIVED extends BASE_TRIGGER {
    static label = 'voiceCallReceived';
    static displayName = 'Receive Voice Call';
    static type = VOICE_CALL;
}
TRIGGERS[TRIGGER_VOICE_CALL_RECEIVED.label] = TRIGGER_VOICE_CALL_RECEIVED;

class TRIGGER_USER_MODEL_UPDATED extends BASE_TRIGGER {
    static label = 'userModelUpdated';
    static displayName = 'User Property Changed';
    static type = USER_PROPERTY_CHANGE;
}
TRIGGERS[TRIGGER_USER_MODEL_UPDATED.label] = TRIGGER_USER_MODEL_UPDATED;

class TRIGGER_USER_LOGIN_SUCCEEDED extends BASE_TRIGGER {
    static label = 'userLoginSucceeded';
    static displayName = 'User Logged In';
    static type = USER_PROPERTY_CHANGE;
}
TRIGGERS[TRIGGER_USER_LOGIN_SUCCEEDED.label] = TRIGGER_USER_LOGIN_SUCCEEDED;

class TRIGGER_EMAIL_RECEIVED extends BASE_TRIGGER {
    static label = 'emailReceived';
    static displayName = 'Receive Email';
    static type = EMAIL;
}
TRIGGERS[TRIGGER_EMAIL_RECEIVED.label] = TRIGGER_EMAIL_RECEIVED;

class TRIGGER_GIT_BRANCH_UPDATED extends BASE_TRIGGER {
    static label = 'gitBranchUpdated';
    static displayName = 'Git Branch Updated';
    static type = COMMIT;
}
TRIGGERS[TRIGGER_GIT_BRANCH_UPDATED.label] = TRIGGER_GIT_BRANCH_UPDATED;

class TRIGGER_CALENDAR_EVENT_STARTED extends BASE_TRIGGER {
    static label = 'calendarEventStarted';
    static displayName = 'Calendar Event Started';
    static type = CALENDAR_EVENT;
}
TRIGGERS[TRIGGER_CALENDAR_EVENT_STARTED.label] = TRIGGER_CALENDAR_EVENT_STARTED;
