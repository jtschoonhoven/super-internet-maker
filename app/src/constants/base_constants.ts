import uuidv4 from 'uuid/v4';
import get from 'lodash/get';
import isPlainObject from 'lodash/isPlainObject';
import { BASE_TRIGGER } from './triggers_constants';

export default abstract class SIM_BASE {
    readonly _uuid: string;
    abstract parent: SIM_BASE;

    constructor() {
        this._uuid = uuidv4();
        // hackily update the parent prop on any children (including collections of children)
        Object.values(this).forEach((child) => {
            if (child instanceof SIM_BASE) {
                child.parent = this;
            }
            else if (child instanceof Array) {
                child.forEach((grandChild) => {
                    if (grandChild instanceof SIM_BASE) {
                        grandChild.parent = this;
                    }
                });
            }
            else if (isPlainObject(child)) {
                Object.values(child).forEach((grandChild) => {
                    if (grandChild instanceof SIM_BASE) {
                        grandChild.parent = this;
                    }
                });
            }
        });
    }

    getParentTrigger(): BASE_TRIGGER {
        if (this instanceof BASE_TRIGGER) {
            return this;
        }
        const maxRecursionDepth = 999;
        let obj: SIM_BASE = this;
        for (let i=maxRecursionDepth; i; i--) {
            if (obj.parent instanceof BASE_TRIGGER) {
                return obj.parent;
            }
            obj = obj.parent;
        }
        throw new Error(`failed to find trigger in any parent of ${ this }`);
    }
}