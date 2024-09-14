import { CurrencyKey, UpgradeKey } from "../../game/player";
import { Upgrade, UpgradeOptions } from "../classes/upgrade";

export type IdsFromClasses<
    T extends { all: unknown } & { [key: string]: unknown },
> = keyof Omit<T, "all">;

// Here's some wild TS shit for you,
// What this does is creates an object of type { all: SomeClass[], [id in config]: SomeClass }
// The first parameter is the config created in db, id is required
// The second parameter is object that is the same for all the configs when instantiating a class
// for example every Upgrade has an upgradeKey and a currency, but we might not want to define
// them for every single upgradeConfig in the db.
// Last input is the class instance itself which we use to create instances
export const createUpgradesFromDbGeneric = <
    T extends readonly { id: string }[],
    G extends object,
    U extends new (config: T[number] & G) => InstanceType<U> & { id: string },
>(
    config: T,
    generalConfig: G,
    UpgradeClass: U
) => {
    type ClassInstance = InstanceType<U>;
    type ClassId = T[number]["id"];
    type ClassRecord = { [key in ClassId]: ClassInstance };

    const classArray = config.map(
        (configItem) => new UpgradeClass({ ...configItem, ...generalConfig })
    );

    return {
        all: classArray,
        ...classArray.reduce((acc, curr) => {
            acc[curr.id as ClassId] = curr;
            return acc;
        }, {} as ClassRecord),
    } as { all: ClassInstance[] } & ClassRecord;
};

export const createUpgradesFromDb = <
    T extends readonly Omit<UpgradeOptions, "upgradeKey" | "currency">[], // This is readonly so that we get typed output with the ids as keys
>(
    config: T,
    upgradeKey: UpgradeKey,
    currency: CurrencyKey
) => {
    return createUpgradesFromDbGeneric(
        config,
        { upgradeKey, currency },
        Upgrade
    );
};
