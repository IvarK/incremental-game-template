import Decimal from "break_infinity.js";
import { CurrencyKey, player, UpgradeKey } from "../../game/player";

// This reduces the queries to useUpgradeStore
const upgradeCache: Record<string, boolean> = {};

export type UpgradeOptions = {
    id: string;
    cost: Decimal;
    upgradeKey: UpgradeKey;
    currency: CurrencyKey;
    description?: string;
    visible?: () => boolean;
    effect?: () => Decimal;
};

export class Upgrade {
    config: UpgradeOptions;
    constructor(config: UpgradeOptions) {
        this.config = config;
    }

    get id() {
        return this.config.id;
    }

    get cost() {
        return this.config.cost;
    }

    get description() {
        return this.config.description;
    }

    get isVisible() {
        return this.config.visible?.() ?? true;
    }

    get hasUpgrade() {
        if (upgradeCache[this.id] !== undefined) return upgradeCache[this.id];
        const hasUpgrade = player.upgrades[this.config.upgradeKey].includes(
            this.id
        );
        upgradeCache[this.id] = hasUpgrade;

        return hasUpgrade;
    }

    get canPurchase() {
        if (this.hasUpgrade) return false;

        return player.currencies[this.config.currency].gte(this.cost);
    }

    purchase() {
        if (!this.canPurchase) return;

        player.currencies[this.config.currency] = player.currencies[
            this.config.currency
        ].sub(this.cost);
        player.upgrades[this.config.upgradeKey].push(this.id);
        upgradeCache[this.id] = true;
    }

    reset() {
        if (!this.hasUpgrade) return false;

        player.upgrades[this.config.upgradeKey] = player.upgrades[
            this.config.upgradeKey
        ].filter((id) => id !== this.id);
        upgradeCache[this.id] = false;
    }
}
