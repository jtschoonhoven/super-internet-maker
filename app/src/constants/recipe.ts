import { BASE_TRIGGER } from './triggers';
import { BASE_ACTION } from './actions';
import { BASE_FIELD } from './fields';
import { BASE_FILTER } from './filters';


export class TRIGGER_FILTER {
    static readonly type: BASE_FILTER;
    static readonly onField: BASE_FIELD;
    static readonly filters: TRIGGER_FILTER[];
    static readonly actions: TRIGGER_ACTION[];
}

export class TRIGGER_ACTION {
    static readonly type: BASE_ACTION;
}

export default interface RECIPE {
    trigger: BASE_TRIGGER;
    filters: TRIGGER_FILTER[];
    actions: TRIGGER_ACTION[];
}
