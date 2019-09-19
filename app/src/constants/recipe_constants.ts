import { BASE_TRIGGER } from './triggers_constants';
import SIM_BASE from './base_constants';


interface _RECIPE {
    readonly trigger?: BASE_TRIGGER;
    onUpdate?: (recipe: RECIPE) => void;
}

export default class RECIPE extends SIM_BASE implements _RECIPE {
    parent: SIM_BASE;
    readonly trigger?: BASE_TRIGGER;
    onUpdate?: (recipe: RECIPE) => void;

    constructor({ trigger, onUpdate }: _RECIPE) {
        super();
        this.parent = this;
        this.trigger = trigger;
        this.onUpdate = onUpdate;
        this.ensureLineage();
    }

    getParentTrigger(): never {
        throw new Error('cannot look up trigger on recipe');
    }
    
    setTrigger({ Trigger }: { Trigger: typeof BASE_TRIGGER }): RECIPE {
        const trigger = new Trigger({ parent: this });
        const recipe = new RECIPE({ trigger, onUpdate: this.onUpdate });
        if (this.onUpdate) {
            this.onUpdate(recipe);
        }
        return recipe;
    }

    updateTrigger({ trigger }: { trigger: BASE_TRIGGER }): RECIPE {
        const newRecipe = new RECIPE({ trigger, onUpdate: this.onUpdate });
        if (this.onUpdate) {
            this.onUpdate(newRecipe);
        }
        return newRecipe;
    }
}
