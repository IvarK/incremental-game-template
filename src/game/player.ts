import { Notation } from "@/lib/options/notations";
import Decimal from "break_infinity.js";

export const initialPlayer = () => ({
    currencies: {
        money: new Decimal(0),
        fame: new Decimal(0),
    },
    buildings: {
        money: {} as Record<string, number>,
    },
    upgrades: {
        money: [] as string[],
        otherUpgrades: [] as string[],
    },
    rebuyableUpgrades: {
        money: {} as Record<string, number>,
        otherRebuyableUpgrades: {} as Record<string, number>,
    },

    options: {
        notation: "mixed scientific" as Notation,
        someOtherOption: 1,
    },

    lastTick: Date.now(),
});

export type Player = ReturnType<typeof initialPlayer>;
export type CurrencyKey = keyof Player["currencies"];
export type BuildingKey = keyof Player["buildings"];
export type UpgradeKey = keyof Player["upgrades"];
export type RebuyableUpgradeKey = keyof Player["rebuyableUpgrades"];
export type OptionKey = keyof Player["options"];

export const player = initialPlayer();
