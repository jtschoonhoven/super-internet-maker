import { BASE_TRIGGER } from './triggers_constants';
import { BASE_ACTION } from './actions_constants';
import { BASE_FIELD } from './fields_constants';
import { BASE_FILTER } from './filters_constants';
import Trigger from '../components/recipe/Trigger';

interface _RECIPE {
    readonly trigger?: BASE_TRIGGER;
    onUpdate?: (recipe: RECIPE) => void;
}

export default class RECIPE implements _RECIPE {
    readonly trigger?: BASE_TRIGGER;
    onUpdate?: (recipe: RECIPE) => void;

    constructor({ trigger, onUpdate }: Partial<_RECIPE> = {}) {
        this.trigger = trigger;
        this.onUpdate = onUpdate;
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
                actions: trigger.actions,
                filters: trigger.filters,
            });
        }
        const recipe = new RECIPE({ trigger, onUpdate: this.onUpdate });
        if (this.onUpdate) {
            this.onUpdate(recipe);
        }
        return recipe;
    }
}
