import { MoneyBuildings } from "@/features/building/core/buildingDb";
import Decimal from "break_infinity.js";

export const totalMoneyGain = () => {
    return MoneyBuildings.all.reduce((acc, building) => {
        return acc.plus(building.production);
    }, new Decimal(0));
};
