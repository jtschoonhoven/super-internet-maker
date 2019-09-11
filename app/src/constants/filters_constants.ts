export class BASE_FILTER {
    readonly displayName: string;

    constructor({ displayName }: BASE_FILTER) {
        this.displayName = displayName;
    }
}

interface _FILTERS {
    regex: BASE_FILTER;
}

const FILTERS: _FILTERS = {
    regex: {
        displayName: 'Regex',
    },
};

export default FILTERS;
