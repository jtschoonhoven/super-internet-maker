import uuidv4 from 'uuid/v4';
import isPlainObject from 'lodash/isPlainObject';
import { BASE_TRIGGER } from '.';


const MAX_RECURSION_DEPTH = 999;


export default abstract class SIM_BASE {
    abstract parent?: SIM_BASE;
    readonly _uuid: string;

    constructor() {
        this._uuid = uuidv4();
    }

    getChildren(): SIM_BASE[] {
        // hackily return any child nodes that have this instance as their parent
        const children: SIM_BASE[] = [];
        Object.entries(this).forEach(([propName, child]) => {
            if (propName === 'parent') {
                return;
            }
            else if (child instanceof SIM_BASE) {
                children.push(child);
            }
        });
        return children;
    }

    getGrandChildren(): SIM_BASE[][] {
        // hackily return any nested child nodes that have this instance as their parent
        const grandChildren: SIM_BASE[][] = [];
        Object.entries(this).forEach(([propName, child]) => {
            if (child instanceof Array) {
                const siblings: SIM_BASE[] = [];
                child.forEach((grandChild) => {
                    if (grandChild instanceof SIM_BASE) {
                        siblings.push(grandChild);
                    }
                    grandChildren.push(siblings);
                });
            }
            else if (isPlainObject(child)) {
                const siblings: SIM_BASE[] = [];
                Object.values(child).forEach((grandChild) => {
                    if (grandChild instanceof SIM_BASE) {
                        siblings.push(grandChild);
                    }
                    grandChildren.push(siblings);
                });
            }
        });
        return grandChildren;
    }

    getParentTrigger(): BASE_TRIGGER {
        if (this instanceof BASE_TRIGGER) {
            return this;
        }
        let obj: SIM_BASE = this;
        for (let i=MAX_RECURSION_DEPTH; i; i--) {
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
        const children = this.getChildren();
        children.forEach((child) => {
            child.parent = this;
            child.ensureLineage();
        });
        const grandChildren = this.getGrandChildren();
        grandChildren.forEach((siblings) => {
            siblings.forEach((grandChild) => {
                grandChild.parent = this;
                grandChild.ensureLineage();
            });
        });
    }
}
