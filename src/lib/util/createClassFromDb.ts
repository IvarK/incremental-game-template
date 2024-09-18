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
export const createClassesFromDb = <
    T extends readonly { id: string }[], // Array of objects with id
    U extends new (config: T[number] & G) => InstanceType<U> & { id: string }, // Ensure U instances have id
    G extends object = Omit<ConstructorParameters<U>[0], keyof T[number]>, // Infer G based on U, omitting keys from T[number]
>(
    config: T,
    generalConfig: G,
    Class: U
) => {
    // Ensure the instance has an id
    type ClassInstance = InstanceType<U> & { id: string };
    type ClassId = T[number]["id"];
    type ClassRecord = Record<ClassId, ClassInstance>;

    const classArray: ClassInstance[] = config.map(
        (configItem) => new Class({ ...configItem, ...generalConfig })
    );

    const classRecord = classArray.reduce((acc, curr) => {
        acc[curr.id as ClassId] = curr;
        return acc;
    }, {} as ClassRecord);

    return {
        all: classArray,
        ...classRecord,
    } as { all: ClassInstance[] } & ClassRecord;
};

/* 
Use it like this, NOTICE THE 'as const', it's important

export const MoneyUpgrades = createClassesFromDb(
    moneyUpgradesDb,
    { upgradeKey: "money", currency: "money" } as const,
    Upgrade
);

*/
