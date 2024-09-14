import Decimal from "break_infinity.js";
import { createUpgradesFromDb } from "../lib/util/createClassFromDb";
import { player } from "../game/player";

// ===== MONEY UPGRADES =====
const moneyUpgradesDb = [
    {
        id: "doubleMoney",
        cost: new Decimal(10),
        description: "Get 2x money",
    },
    {
        id: "tripleMoney",
        cost: new Decimal(50),
        description: "Get 3x money",
        visible: () => player.currencies.money.gte(10),
    },
] as const;

export const MoneyUpgrades = createUpgradesFromDb(
    moneyUpgradesDb,
    "money",
    "money"
);

// If you need to get the ID type, you can use this utility class
// type MoneyUpgradeId = IdsFromClasses<typeof MoneyUpgrades>

// ===== OTHER UPGRADES =====
export const otherUpgradesDb = [
    {
        id: "something",
        cost: new Decimal(308),
        description: "does something",
    },
] as const;

export const OtherUpgrades = createUpgradesFromDb(
    otherUpgradesDb,
    "otherUpgrades",
    "fame"
);
