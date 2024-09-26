import { MoneyBuildings } from "@/features/building/core/buildingDb";
import { Upgrade, UpgradeOptions } from "@/features/upgrade/core/upgrade";
import { EFFECT_TARGET } from "@/game/enum/effectTargets";
import { player } from "@/game/player";
import { createClassesFromDb } from "@/lib/util/createClassFromDb";
import { OmitCommonUpgradeOptions } from "@/lib/util/types";
import Decimal from "break_infinity.js";

// OmitCommonUpgradeOptions is a utility type that removes 'currency' and 'upgradeKey'
// We use it because they are common values across all the upgrades of a single type
type UpgradeDbConfig = OmitCommonUpgradeOptions<UpgradeOptions>;

// ===== MONEY UPGRADES =====
const moneyUpgradesDb = [
    {
        id: "grandmaBoost",
        cost: new Decimal(10),
        description: "Gain 5% more money per grandma",
        effect: () => Decimal.pow(1.05, MoneyBuildings.grandma.purchased),
        effectTarget: EFFECT_TARGET.money,
        effectOperator: "mult",
    },
    {
        id: "tripleMoney",
        cost: new Decimal(50),
        description: "Get 3x money",
        visible: () => player.currencies.money.gte(10),
        effect: () => 3,
        effectTarget: EFFECT_TARGET.money,
        effectOperator: "mult",
    },
    // 'as const' is used so we can use the id's as keys
    // 'satisfies...' is used so that we will get an error here if the config is incorrect
    // otherwise we would get an error further down, which is less helpful
] as const satisfies Readonly<UpgradeDbConfig[]>;

// Note: 'as const' is important, otherwise you will get an error
export const MoneyUpgrades = createClassesFromDb(
    moneyUpgradesDb,
    { upgradeKey: "money", currency: "money" } as const,
    Upgrade
);

// ===== OTHER UPGRADES =====
export const otherUpgradesDb = [
    {
        id: "something",
        cost: new Decimal(308),
        description: "does something",
    },
] as const satisfies Readonly<UpgradeDbConfig[]>;

// Note: 'as const' is important, otherwise you will get an error
export const OtherUpgrades = createClassesFromDb(
    otherUpgradesDb,
    { upgradeKey: "otherUpgrades", currency: "fame" } as const,
    Upgrade
);
