import { BASE_TRIGGER } from '.';
import { SIM_BASE } from '.';


interface _RECIPE {
    readonly trigger?: BASE_TRIGGER;
    selectedIngredient: SIM_BASE;
    onUpdate?: (recipe: RECIPE) => void;
}

export default class RECIPE extends SIM_BASE implements _RECIPE {
    parent?: SIM_BASE;
    readonly trigger?: BASE_TRIGGER;
    onUpdate?: (recipe: RECIPE) => void;
    selectedIngredient: SIM_BASE;

    constructor(
        { trigger, onUpdate, selectedIngredient }:
        { trigger?: BASE_TRIGGER, onUpdate?: (recipe: RECIPE) => void, selectedIngredient?: SIM_BASE }
    ) {
        super();
        this.parent = this;
        this.trigger = trigger;;
        this.onUpdate = onUpdate;
        this.selectedIngredient = selectedIngredient || this;
        this.ensureLineage();
    }

    getParentTrigger(): never {
        throw new Error('cannot look up trigger on recipe');
    }

    getParentRecipe(): RECIPE {
        return this;
    }

    updateTrigger({ trigger }: { trigger: BASE_TRIGGER }): BASE_TRIGGER {
        const newRecipe = new RECIPE({
            trigger,
            onUpdate: this.onUpdate,
            selectedIngredient: this.selectedIngredient,
        });
        if (this.onUpdate) {
            this.onUpdate(newRecipe);
        }
        return trigger;
    }

    updateSelectedIngredient(ingredient: SIM_BASE): void {
        const newRecipe = new RECIPE({
            trigger: this.trigger,
            onUpdate: this.onUpdate,
            selectedIngredient: ingredient,
        });
        if (this.onUpdate) {
            this.onUpdate(newRecipe);
        }
    }

    toggleIsExpanded(): never {
        throw new Error('Recipe can not be expanded.');
    }
}
