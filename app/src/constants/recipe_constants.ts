import { BASE_TRIGGER } from './triggers_constants';
import SIM_BASE from './base_constants';


interface _RECIPE {
    readonly trigger?: BASE_TRIGGER;
    onUpdate?: (recipe: RECIPE) => void;
}

export default class RECIPE extends SIM_BASE implements _RECIPE {
    readonly parent: SIM_BASE;
    readonly trigger?: BASE_TRIGGER;
    onUpdate?: (recipe: RECIPE) => void;

    constructor({ trigger, onUpdate }: Partial<_RECIPE> = {}) {
        super();
        this.parent = this;
        this.trigger = trigger;
        this.onUpdate = onUpdate;
    }

    getParentTrigger(): never {
        throw new Error('cannot look up trigger on recipe');
    }

    setTrigger(Trigger: typeof BASE_TRIGGER): RECIPE {
        const trigger = new Trigger({ parent: this });
        const recipe = new RECIPE({ trigger, onUpdate: this.onUpdate });
        if (this.onUpdate) {
            this.onUpdate(recipe);
        }
        return recipe;
    }

    updateTrigger(trigger: BASE_TRIGGER): RECIPE {
        if (trigger.parent !== this) {
            const Trigger = (trigger.constructor as typeof BASE_TRIGGER);
            trigger = new Trigger({
                parent: this,
                actionGroup: trigger.actionGroup,
                filterGroup: trigger.filterGroup,
            });
        }
        const recipe = new RECIPE({ trigger, onUpdate: this.onUpdate });
        if (this.onUpdate) {
            this.onUpdate(recipe);
        }
        return recipe;
    }
}
