import { player, UpgradeKey } from "@/game/player";
import { UpgradeBase, UpgradeBaseOptions } from "@/lib/classes/upgradeBase";
import { EffectManager } from "@/lib/util/effect";
import Decimal from "break_infinity.js";

// This reduces the queries to player, so we don't need to search the array every time
const upgradeCache: Record<string, boolean> = {};

export type UpgradeOptions = UpgradeBaseOptions & {
    cost: Decimal;
    upgradeKey: UpgradeKey;
};

export class Upgrade extends UpgradeBase {
    config: UpgradeOptions;

    constructor(config: UpgradeOptions) {
        super(config);
        this.config = config;
        if (
            this.config.effect &&
            this.config.effectTarget &&
            this.config.effectOperator
        ) {
            EffectManager.register({
                target: this.config.effectTarget,
                operator: this.config.effectOperator,
                effect: this.config.effect,
                active: () => this.hasUpgrade,
            });
        }
    }

    get cost() {
        return this.config.cost;
    }

    get hasUpgrade() {
        if (upgradeCache[this.id] !== undefined) return upgradeCache[this.id];
        const hasUpgrade = player.upgrades[this.config.upgradeKey].includes(
            this.id
        );
        upgradeCache[this.id] = hasUpgrade;

        return hasUpgrade;
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
