import Decimal from "break_infinity.js";

export const initialPlayer = () => ({
    currencies: {
        money: new Decimal(0),
        fame: new Decimal(0),
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
        notation: "",
        someOtherOption: 1,
    },
});

export type Player = ReturnType<typeof initialPlayer>;
export type CurrencyKey = keyof Player["currencies"];
export type UpgradeKey = keyof Player["upgrades"];
export type RebuyableUpgradeKey = keyof Player["rebuyableUpgrades"];
export type OptionKey = keyof Player["options"];

export const player = initialPlayer();
