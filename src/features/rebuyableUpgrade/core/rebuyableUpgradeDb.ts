import {
    RebuyableUpgrade,
    RebuyableUpgradeOptions,
} from "@/features/rebuyableUpgrade/core/rebuyableUpgrade";
import { player } from "@/game/player";
import { createClassesFromDb } from "@/lib/util/createClassFromDb";
import { OmitCommonUpgradeOptions } from "@/lib/util/types";
import Decimal from "break_infinity.js";

type RebuyableUpgradeDb = OmitCommonUpgradeOptions<RebuyableUpgradeOptions>;

// ===== MONEY UPGRADES =====
const rebuyableUpgradeDb = [
    {
        id: "doubleMoney",
        cost: (x: number) => Decimal.pow(10, x).times(10),
        description: "Get 2x money",
    },
    {
        id: "tripleMoney",
        cost: (x: number) => Decimal.pow(25, x).times(50),
        description: "Get 3x money",
        visible: () => player.currencies.money.gte(10),
    },
] as const satisfies Readonly<RebuyableUpgradeDb[]>;

// Note: 'as const' is important, otherwise you will get an error
export const RebuyableUpgrades = createClassesFromDb(
    rebuyableUpgradeDb,
    { currency: "money", upgradeKey: "money" } as const,
    RebuyableUpgrade
);
