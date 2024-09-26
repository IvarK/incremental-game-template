import Decimal from "break_infinity.js";
import { UpgradeBaseOptions } from "../classes/upgradeBase";

export type OmitCommonUpgradeOptions<T extends UpgradeBaseOptions> = Omit<
    T,
    "currency" | "upgradeKey"
>;

export type Numberish = number | Decimal;
