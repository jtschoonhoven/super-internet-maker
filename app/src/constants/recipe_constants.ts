import { BASE_TRIGGER } from '.';
import { SIM_BASE } from '.';


interface _RECIPE {
    readonly trigger?: BASE_TRIGGER;
    onUpdate?: (recipe: RECIPE) => void;
}

export default class RECIPE extends SIM_BASE implements _RECIPE {
    parent?: SIM_BASE;
    readonly trigger?: BASE_TRIGGER;
    onUpdate?: (recipe: RECIPE) => void;

    constructor({ trigger, onUpdate }: { trigger?: BASE_TRIGGER, onUpdate?: (recipe: RECIPE) => void }) {
        super();
        this.parent = this;
        this.trigger = trigger;;
        this.onUpdate = onUpdate;
        this.ensureLineage();
    }

    getParentTrigger(): never {
        throw new Error('cannot look up trigger on recipe');
    }

    updateTrigger({ trigger }: { trigger: BASE_TRIGGER }): BASE_TRIGGER {
        const newRecipe = new RECIPE({ trigger, onUpdate: this.onUpdate });
        if (this.onUpdate) {
            this.onUpdate(newRecipe);
        }
        return trigger;
    }
}
