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
import { on } from 'cluster';


const TRIGGERS: { [name: string]: typeof BASE_TRIGGER } = {};
export default TRIGGERS;

interface _TRIGGER_FILTER {
    parent?: FILTER_GROUP;
    readonly type: BASE_FILTER;
    readonly onField: typeof BASE_FIELD;
    readonly isExpanded: boolean;
}

/**
 * A single filter on a single field.
 */
export class TRIGGER_FILTER extends SIM_BASE implements _TRIGGER_FILTER {
    parent?: FILTER_GROUP;
    readonly type: BASE_FILTER;
    readonly onField: typeof BASE_FIELD;
    readonly isExpanded: boolean;

    constructor(props: _TRIGGER_FILTER) {
        super();
        this.type = props.type;
        this.onField = props.onField;
        this.parent = props.parent;
        this.isExpanded = props.isExpanded || false;
    }

    /**
     * Replace this instance with a new instance with one or more updated properties.
     * Cascades updates up the chain.
     */
    updateProperties(props: Partial<_TRIGGER_FILTER>): void {
        if (!this.parent) {
            throw new Error('Cannot update trigger filter without a parent');
        }
        const filter = new TRIGGER_FILTER({
            type: props.type || this.type,
            onField: props.onField || this.onField,
            parent: props.parent || this.parent,
            isExpanded: typeof props.isExpanded === 'boolean' ? props.isExpanded : this.isExpanded,
        });
        const atIndex = this.parent.filters.indexOf(this);
        this.parent.updateFilter({ filter, atIndex });
    }

    /**
     * Toggles the "isExpanded" boolean prop.
     */
    toggleIsExpanded(): void {
        this.updateProperties({ isExpanded: !this.isExpanded });
    }
}

interface _FILTER_GROUP {
    parent?: BASE_TRIGGER | FILTER_GROUP;
    readonly operator: 'and' | 'or';
    readonly filters: TRIGGER_FILTER[];
    readonly actions: BASE_ACTION[];
    readonly filterGroups: FILTER_GROUP[];
    readonly filterGroupElse?: FILTER_GROUP;
    readonly isExpanded: boolean;
}

/**
 * A collection of actions and child filtergroups to activate if all filters in this group are true.
 */
export class FILTER_GROUP extends SIM_BASE implements _FILTER_GROUP {
    parent?: BASE_TRIGGER | FILTER_GROUP;
    readonly operator: 'and' | 'or';
    readonly filters: TRIGGER_FILTER[];
    readonly actions: BASE_ACTION[];
    readonly filterGroups: FILTER_GROUP[];
    readonly filterGroupElse?: FILTER_GROUP;
    readonly isExpanded: boolean;

    constructor(props: Partial<_FILTER_GROUP>) {
        super();
        this.parent = props.parent;
        this.operator = props.operator || 'and';
        this.filters = props.filters || [];
        this.actions = props.actions || [new ACTION_NONE({})];
        this.filterGroups = props.filterGroups || [];
        this.filterGroupElse = props.filterGroupElse;
        this.isExpanded = props.isExpanded || false;
    }

    addFilter({ filter }: { filter: TRIGGER_FILTER }): FILTER_GROUP {
        const newFilters = [...this.filters, filter];
        return this.updateProperties({ filters: newFilters });
    }

    /**
     * Replace the current TRIGGER_FILTER at the given index with the one provided and cascade updates.
     */
    updateFilter({ filter, atIndex }: { filter: TRIGGER_FILTER, atIndex: number }): FILTER_GROUP {
        const newFilters = [...this.filters];
        newFilters[atIndex] = filter;
        return this.updateProperties({ filters: newFilters });
    }

    addAction({ action }: { action: BASE_ACTION }): FILTER_GROUP {
        const newActions = [...this.actions, action];
        return this.updateProperties({ actions: newActions });
    }

    updateAction({ action, atIndex }: { action: BASE_ACTION, atIndex: number }): FILTER_GROUP {
        const newActions = [...this.actions];
        newActions[atIndex] = action;
        return this.updateProperties({ actions: newActions });
    }

    // replaceWith({ filterGroup }: { filterGroup: FILTER_GROUP }): FILTER_GROUP {
    //     if (!this.parent) {
    //         throw new Error('cannot replace filter group without a parent');
    //     }
    //     const atIndex = this.parent.filterGroups.indexOf(this);
    //     this.parent.updateFilterGroup({ filterGroup, atIndex });
    //     return filterGroup;
    // }

    updateFilterGroup({ filterGroup, atIndex }: { filterGroup: FILTER_GROUP, atIndex: number }): FILTER_GROUP {
        const newFilterGroups = [...this.filterGroups];
        newFilterGroups[atIndex] = filterGroup;
        return this.updateProperties({ filterGroups: newFilterGroups });
    }

    addFilterGroup({ filterGroup }: { filterGroup: FILTER_GROUP }): FILTER_GROUP {
        const newFilterGroups = [...this.filterGroups, filterGroup];
        return this.updateProperties({ filterGroups: newFilterGroups });
    }

    /**
     * Update one or more properties on this FILTER GROUP instance and return a new one.
     * Changes cascade up the chain.
     */
    updateProperties(props: Partial<_FILTER_GROUP>): FILTER_GROUP {
        if (!this.parent) {
            throw new Error('cannot update filter group properties without a parent');
        }
        const newFilterGroup = new FILTER_GROUP({
            parent: props.parent || this.parent,
            operator: props.operator || this.operator,
            filters: props.filters || this.filters,
            actions: props.actions || this.actions,
            filterGroups: props.filterGroups || this.filterGroups,
            filterGroupElse: props.filterGroupElse || this.filterGroupElse,
            isExpanded: typeof props.isExpanded === 'boolean' ? props.isExpanded : this.isExpanded,
        });
        const atIndex = this.parent.filterGroups.indexOf(this);
        this.parent.updateFilterGroup({ filterGroup: newFilterGroup, atIndex });
        return newFilterGroup;
    }

    /**
     * Toggles the "isExpanded" boolean prop.
     */
    toggleIsExpanded(): void {
        this.updateProperties({ isExpanded: !this.isExpanded });
    }
}


interface _BASE_TRIGGER {
    parent?: RECIPE;
    readonly label: string;
    readonly displayName: string;
    readonly type: typeof BASE_EVENT;
    readonly filterGroups: FILTER_GROUP[];
    readonly isExpanded: boolean;
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
    readonly filterGroups: FILTER_GROUP[];
    readonly isExpanded: boolean;
    parent?: RECIPE;

    // assign instance props from static props
    constructor(
        { parent, filterGroups, isExpanded }:
        { parent?: RECIPE, filterGroups?: FILTER_GROUP[], isExpanded?: boolean },
    ) {
        super();
        this.label = (this.constructor as typeof BASE_TRIGGER).label;
        this.displayName = (this.constructor as typeof BASE_TRIGGER).displayName;
        this.type = (this.constructor as typeof BASE_TRIGGER).type;
        this.parent = parent;
        this.filterGroups = filterGroups || [new FILTER_GROUP({})];
        this.isExpanded = isExpanded || false;
    }

    updateProperties(props: { parent?: RECIPE, filterGroups?: FILTER_GROUP[], isExpanded?: boolean }): BASE_TRIGGER {
        if (!this.parent) {
            throw new Error('cannot update properties on trigger trigger without parent');
        }
        const Trigger = (this.constructor as typeof BASE_TRIGGER);
        const newTrigger = new Trigger({
            parent: props.parent || this.parent,
            filterGroups: props.filterGroups || this.filterGroups,
            isExpanded: props.isExpanded || this.isExpanded,
        });
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
