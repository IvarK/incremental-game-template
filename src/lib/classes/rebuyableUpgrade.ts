import Decimal from "break_infinity.js";
import { Upgrade, UpgradeOptions } from "./upgrade";
import { useRebuyableUpgradeStore } from "../stores/useRebuyableUpgradeStore";
import { RebuyableUpgradeKey } from "../../game/player";
import { useCurrencyStore } from "../stores/useCurrencyStore";

const upgradeCache: Record<string, number> = {}

export type RebuyableUpgradeOptions = UpgradeOptions & {
    cost: (purchased: number) => Decimal
    effect?: (purchased: number) => Decimal
    upgradeKey: RebuyableUpgradeKey;
}

export class RebuyableUpgrade extends Upgrade {
    config: RebuyableUpgradeOptions;

    constructor(config: RebuyableUpgradeOptions) {
        super(config)
        this.config = config;
    }

    get cost() {
        return this.config.cost(this.amount)
    }

    get amount() {
        if (upgradeCache[this.id] !== undefined) return upgradeCache[this.id];
        const { rebuyableUpgrades } = useRebuyableUpgradeStore.getState();
        const bought = rebuyableUpgrades[this.config.upgradeKey][this.id]
        upgradeCache[this.id] = bought;

        return bought;
    }

    get effect() {
        return this.config.effect?.(this.amount)
    }

    purchase() {
        if (!this.canPurchase) return;

        useCurrencyStore.getState().reduceCurrency(this.config.currency, this.cost);
        useRebuyableUpgradeStore.getState().addUpgrade(this.config.upgradeKey, this.id);

        if (!upgradeCache[this.id]) upgradeCache[this.id] = 0;
        upgradeCache[this.id]++;
    }

    reset() {
        if (!this.hasUpgrade) return false;

        useRebuyableUpgradeStore.getState().resetUpgrade(this.config.upgradeKey, this.id)
        upgradeCache[this.id] = 0;
    }
}