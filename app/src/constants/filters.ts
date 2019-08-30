export interface BASE_FILTER {
    readonly displayName: string;
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
