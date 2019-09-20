import uuidv4 from 'uuid/v4';
import get from 'lodash/get';
import isPlainObject from 'lodash/isPlainObject';
import { BASE_TRIGGER } from './triggers_constants';

export default abstract class SIM_BASE {
    abstract parent?: SIM_BASE;
    readonly _uuid: string;

    constructor() {
        this._uuid = uuidv4();
    }

    getParentTrigger(): BASE_TRIGGER {
        if (this instanceof BASE_TRIGGER) {
            return this;
        }
        const maxRecursionDepth = 999;
        let obj: SIM_BASE = this;
        for (let i=maxRecursionDepth; i; i--) {
            if (!obj.parent) {
                throw new Error(`parent of ${ obj } is undefined`);
            }
            if (obj.parent instanceof BASE_TRIGGER) {
                return obj.parent;
            }
            obj = obj.parent;
        }
        throw new Error(`failed to find trigger in any parent of ${ this }`);
    }

    ensureLineage(): void {
        // hackily update the parent prop on any children (including collections of children)
        Object.entries(this).forEach(([propName, child]) => {
            if (propName === 'parent') {
                return;
            }
            if (child instanceof SIM_BASE) {
                child.parent = this;
                child.ensureLineage();
            }
            else if (child instanceof Array) {
                child.forEach((grandChild) => {
                    if (grandChild instanceof SIM_BASE) {
                        grandChild.parent = this;
                        grandChild.ensureLineage();
                    }
                });
            }
            else if (isPlainObject(child)) {
                Object.values(child).forEach((grandChild) => {
                    if (grandChild instanceof SIM_BASE) {
                        grandChild.parent = this;
                        grandChild.ensureLineage();
                    }
                });
            }
        });
    }
}