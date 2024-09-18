import { UpgradeBaseOptions } from "../classes/upgradeBase";

export type OmitCommonUpgradeOptions<T extends UpgradeBaseOptions> = Omit<
    T,
    "currency" | "upgradeKey"
>;
