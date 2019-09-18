import uuidv4 from 'uuid/v4';
import { BASE_TRIGGER } from './triggers_constants';

export default abstract class SIM_BASE {
    readonly _uuid: string;
    abstract parent: SIM_BASE;

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
            if (obj.parent instanceof BASE_TRIGGER) {
                return obj.parent;
            }
            obj = obj.parent;
        }
        throw new Error(`failed to find trigger in any parent of ${ this }`);
    }
}