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


const TRIGGERS: { [name: string]: typeof BASE_TRIGGER } = {};
export type FILTERABLE = TRIGGER_FILTER | TRIGGER_FILTER_GROUP;
export default TRIGGERS;

export class TRIGGER_FILTER extends SIM_BASE {
    readonly type: BASE_FILTER;
    readonly onField: typeof BASE_FIELD;
    readonly filterGroup: TRIGGER_FILTER_GROUP;
    readonly actions: TRIGGER_ACTION_GROUP;
    readonly parent: TRIGGER_FILTER_GROUP;

    constructor(
        { type, onField, filterGroup, actions, parent }:
        {
            type: BASE_FILTER,
            onField: typeof BASE_FIELD,
            filterGroup?: TRIGGER_FILTER_GROUP,
            actions?: TRIGGER_ACTION_GROUP,
            parent: TRIGGER_FILTER_GROUP,
        },
    ) {
        super();
        this.type = type;
        this.onField = onField;
        this.filterGroup = filterGroup || new TRIGGER_FILTER_GROUP({ parent: this, operator: 'and' });
        this.actions = actions || new TRIGGER_ACTION_GROUP({ parent: this });
        this.parent = parent;
    }

    updateFilterGroup({ filterGroup }: { filterGroup: TRIGGER_FILTER_GROUP }): TRIGGER_FILTER {
        const newFilter = new TRIGGER_FILTER({
            type: this.type,
            onField: this.onField,
            filterGroup: filterGroup,
            actions: this.actions,
            parent: this.parent,
        });
        const index = this.parent.filters.indexOf(this);
        this.parent.updateFilter({ filter: newFilter, atIndex: index });
        return newFilter;
    }
}

export class TRIGGER_FILTER_GROUP extends SIM_BASE {
    readonly filters: FILTERABLE[];
    readonly parent: BASE_TRIGGER | FILTERABLE;
    readonly operator: 'and' | 'or';

    constructor(
        { filters, operator, parent }:
        {
            filters?: FILTERABLE[],
            operator: 'and' | 'or',
            parent: FILTERABLE | BASE_TRIGGER,
        },
    ) {
        super();
        this.filters = filters || [];
        this.operator = operator;
        this.parent = parent;
    }

    addFilter({ filter }: { filter: FILTERABLE }): TRIGGER_FILTER_GROUP {
        // instantiate a new filter group to replace this one
        const newFilterGroup = new TRIGGER_FILTER_GROUP({
            filters: [...this.filters, filter],
            operator: this.operator,
            parent: this.parent,
        });
        return this._replaceWith(newFilterGroup);
    }

    updateFilter({ filter, atIndex }: { filter: FILTERABLE, atIndex: number }): TRIGGER_FILTER_GROUP {
        // ensure index is valid
        if (atIndex < 0 || atIndex >= this.filters.length) {
            throw new Error(`cannot update filter at index ${ atIndex }: does not exist`);
        }
        // copy current filters and replace the specified filter
        const newFilters = [...this.filters];
        newFilters[atIndex] = filter;
        // instantiate a new filter group to replace this one
        const newFilterGroup = new TRIGGER_FILTER_GROUP({
            filters: newFilters,
            operator: this.operator,
            parent: this.parent,
        });
        return this._replaceWith(newFilterGroup);
    }

    setOperator({ operator }: { operator: 'and' | 'or' }): TRIGGER_FILTER_GROUP {
        // instantiate a new filter group to replace this one
        const newFilterGroup = new TRIGGER_FILTER_GROUP({
            filters: this.filters,
            operator: this.operator,
            parent: this.parent,
        });
        return this._replaceWith(newFilterGroup);
    }

    private _replaceWith<T extends TRIGGER_FILTER_GROUP>(newFilterGroup: T): T {
        // if parent is trigger, replace its filter group
        if (this.parent instanceof BASE_TRIGGER) {
            this.parent.updateFilterGroup({ filterGroup: newFilterGroup });
        }
        // if parent is another filter group, replace its appropriate child filter group
        else if (this.parent instanceof TRIGGER_FILTER_GROUP) {
            const filterIndex = this.parent.filters.indexOf(this);
            this.parent.updateFilter({ filter: newFilterGroup, atIndex: filterIndex });
        }
        else if (this.parent instanceof TRIGGER_FILTER) {
            this.parent.updateFilterGroup({ filterGroup: newFilterGroup });
        }
        else {
            throw new Error(`cannot update parent with unexpected type ${ newFilterGroup }`);
        }
        return newFilterGroup;
    }
}

export class TRIGGER_ACTION extends SIM_BASE {
    readonly type: BASE_ACTION;
    readonly parent: BASE_TRIGGER | FILTERABLE;

    constructor({ type, parent }: TRIGGER_ACTION) {
        super();
        this.parent = parent;
        this.type = type;
    }
}

export class TRIGGER_ACTION_GROUP extends SIM_BASE {
    readonly actions: TRIGGER_ACTION[];
    readonly parent: BASE_TRIGGER | FILTERABLE;

    constructor(
        { actions, parent }:
        { actions?: TRIGGER_ACTION[], parent: BASE_TRIGGER | FILTERABLE },
    ) {
        super();
        this.actions = actions || [];
        this.parent = parent;
    }
}

interface _BASE_TRIGGER {
    readonly label: string;
    readonly displayName: string;
    readonly type: typeof BASE_EVENT;
    readonly parent: RECIPE;
    readonly filterGroup: TRIGGER_FILTER_GROUP;
    readonly actionGroup: TRIGGER_ACTION_GROUP;
}

export class BASE_TRIGGER extends SIM_BASE implements _BASE_TRIGGER {
    static readonly label: string;
    static readonly displayName: string;
    static readonly type: typeof BASE_EVENT;
    // instance props match static props
    readonly label: string;
    readonly displayName: string;
    readonly type: typeof BASE_EVENT;
    // instance-only props
    readonly parent: RECIPE;
    readonly filterGroup: TRIGGER_FILTER_GROUP;
    readonly actionGroup: TRIGGER_ACTION_GROUP;

    // assign instance props from static props
    constructor(
        { parent, filterGroup, actionGroup }:
        { parent: RECIPE, filterGroup?: TRIGGER_FILTER_GROUP, actionGroup?: TRIGGER_ACTION_GROUP },
    ) {
        super();
        this.label = (this.constructor as typeof BASE_TRIGGER).label;
        this.displayName = (this.constructor as typeof BASE_TRIGGER).displayName;
        this.type = (this.constructor as typeof BASE_TRIGGER).type;
        this.parent = parent;
        this.filterGroup = filterGroup || new TRIGGER_FILTER_GROUP({ parent: this, operator: 'and' });
        this.actionGroup = actionGroup || new TRIGGER_ACTION_GROUP({ parent: this });
    }

    updateFilterGroup({ filterGroup }: { filterGroup: TRIGGER_FILTER_GROUP }): BASE_TRIGGER {
        const Trigger = (this.constructor as typeof BASE_TRIGGER);
        const newTrigger = new Trigger({
            parent: this.parent,
            filterGroup: filterGroup,
            actionGroup: this.actionGroup,
        });
        this.parent.updateTrigger(newTrigger);
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
