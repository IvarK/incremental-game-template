import { CurrencyKey, player } from "@/game/player";
import Decimal from "break_infinity.js";

export type UpgradeBaseOptions = {
    id: string;
    currency: CurrencyKey;
    description?: string;
    visible?: () => boolean;
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

    purchase() {
        throw new Error("Not implemented");
    }

    reset() {
        throw new Error("Not implemented");
    }
}
