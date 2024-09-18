import { Building, BuildingOptions } from "@/features/building/core/building";
import { createClassesFromDb } from "@/lib/util/createClassFromDb";
import { OmitCommonUpgradeOptions } from "@/lib/util/types";
import Decimal from "break_infinity.js";

type BuildingDbConfig = OmitCommonUpgradeOptions<
    Omit<BuildingOptions, "produces">
>;

const moneyBuildingsDb = [
    {
        id: "moneyBuilding1",
        name: "Grandma",
        initialCost: new Decimal(10),
        costMultiplier: new Decimal(1.1),
        production: (purchased: number) => new Decimal(1).times(purchased),
    },
    {
        id: "moneyBuilding2",
        name: "A Dimension",
        initialCost: new Decimal(100),
        costMultiplier: new Decimal(1.1),
        production: (purchased: number) => new Decimal(10).times(purchased),
    },
] as const satisfies Readonly<BuildingDbConfig[]>;

// Note: 'as const' is important, otherwise you will get an error
export const Buildings = createClassesFromDb(
    moneyBuildingsDb,
    {
        currency: "money",
        produces: "money",
        upgradeKey: "money",
    } as const,
    Building
);
