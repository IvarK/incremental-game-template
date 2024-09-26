import Decimal from "break_infinity.js";
import { UpgradeBase, UpgradeBaseOptions } from "@/lib/classes/upgradeBase";
import { player, RebuyableUpgradeKey } from "@/game/player";

export type RebuyableUpgradeOptions = UpgradeBaseOptions & {
    cost: (purchased: number) => Decimal;
    upgradeKey: RebuyableUpgradeKey;
};

export class RebuyableUpgrade extends UpgradeBase {
    config: RebuyableUpgradeOptions;

    constructor(config: RebuyableUpgradeOptions) {
        super(config);
        this.config = config;
    }

    get cost() {
        return this.config.cost(this.purchased);
    }

    get purchased() {
        return player.rebuyableUpgrades[this.config.upgradeKey][this.id];
    }

    get effect() {
        if ("effect" in this.config === false || this.purchased === 0) return 1;

        return typeof this.config.effect === "function"
            ? this.config.effect(this.purchased)
            : this.config.effect;
    }

    purchase() {
        if (!this.canPurchase) return;

        player.currencies[this.config.currency] = player.currencies[
            this.config.currency
        ].minus(this.cost);

        player.rebuyableUpgrades[this.config.upgradeKey][this.id] =
            (player.rebuyableUpgrades[this.config.upgradeKey][this.id] || 0) +
            1;
    }

    reset() {
        if (!this.hasUpgrade) return false;

        player.rebuyableUpgrades[this.config.upgradeKey][this.id] = 0;
    }
}
