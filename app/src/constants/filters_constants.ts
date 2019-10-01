import { SIM_BASE } from ".";

export class BASE_FILTER extends SIM_BASE {
    parent?: SIM_BASE;
    readonly displayName: string;

    constructor({ displayName, parent }: { displayName: string, parent?: SIM_BASE }) {
        super();
        this.parent = parent;
        this.displayName = displayName;
    }
}

interface _FILTERS {
    regex: BASE_FILTER;
}

const FILTERS: _FILTERS = {
    regex: new BASE_FILTER({ displayName: 'regex' }),
};

export default FILTERS;
