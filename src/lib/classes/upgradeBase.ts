import { CurrencyKey, player } from "@/game/player";
import { Operator } from "@/lib/util/effect";
import { Numberish } from "@/lib/util/types";
import Decimal from "break_infinity.js";

export type UpgradeBaseOptions = {
    id: string;
    currency: CurrencyKey;
    description?: string;
    visible?: () => boolean;
    effect?: Numberish | ((purchased?: number) => Numberish);
    effectTarget?: string;
    effectOperator?: Operator;
};

export class UpgradeBase {
    config: UpgradeBaseOptions;

    constructor(config: UpgradeBaseOptions) {
        this.config = config;
    }

    get cost(): Decimal {
        throw new Error("Not implemented");
    }

    get hasUpgrade(): boolean {
        throw new Error("Not implemented");
    }

    get id() {
        return this.config.id;
    }

    get description() {
        return this.config.description;
    }

    get isVisible() {
        return this.config.visible?.() ?? true;
    }

    get canPurchase() {
        if (this.hasUpgrade) return false;

        return player.currencies[this.config.currency].gte(this.cost);
    }

    get effect() {
        if ("effect" in this.config === false || !this.hasUpgrade) return 1;

        return typeof this.config.effect === "function"
            ? this.config.effect()
            : this.config.effect;
    }

    purchase() {
        throw new Error("Not implemented");
    }

    reset() {
        throw new Error("Not implemented");
    }
}
