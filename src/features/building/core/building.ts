import { BuildingKey, CurrencyKey, player } from "@/game/player";
import { UpgradeBase, UpgradeBaseOptions } from "@/lib/classes/upgradeBase";
import Decimal from "break_infinity.js";

export type BuildingOptions = Omit<UpgradeBaseOptions, "description"> & {
    name: string;
    initialCost: Decimal;
    costMultiplier: Decimal;
    upgradeKey: BuildingKey;
    production: (purchased: number) => Decimal;
    produces: CurrencyKey;
};

export class Building extends UpgradeBase {
    config: BuildingOptions;

    constructor(config: BuildingOptions) {
        super(config);
        this.config = config;
    }

    get name() {
        return this.config.name;
    }

    get purchased() {
        return player.buildings[this.config.upgradeKey][this.id] ?? 0;
    }

    get cost() {
        return Decimal.pow(this.config.costMultiplier, this.purchased).times(
            this.config.initialCost
        );
    }

    get production() {
        return this.config.production(this.purchased);
    }

    get canPurchase() {
        return player.currencies[this.config.currency].gte(this.cost);
    }

    purchase() {
        if (!this.canPurchase) return;

        player.currencies.money = player.currencies.money.sub(this.cost);
        player.buildings[this.config.upgradeKey][this.id] =
            (player.buildings[this.config.upgradeKey][this.id] || 0) + 1;
    }

    reset() {
        if (!this.purchased) return false;

        player.buildings[this.config.upgradeKey][this.id] = 0;
    }

    /**
     *
     * @param diff Time since last tick in milliseconds
     */
    tick(diff: number) {
        player.currencies[this.config.produces] = player.currencies[
            this.config.produces
        ].add(this.production.times(diff / 1000));
    }
}
