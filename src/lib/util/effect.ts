import { Numberish } from "@/lib/util/types";
import Decimal from "break_infinity.js";

export type Operator = "add" | "mult" | "pow";
type EffectInstance = {
    effect: Numberish | (() => Numberish);
    operator: Operator;
};

class Effect {
    _effects: Record<string, EffectInstance[]>;
    constructor() {
        this._effects = {};
    }

    register(
        effectTarget: string,
        effect: Numberish | (() => Numberish),
        operator: Operator
    ) {
        if (this._effects[effectTarget] === undefined) {
            this._effects[effectTarget] = [];
        }
        this._effects[effectTarget].push({ effect, operator });
    }

    get(effectTarget: string) {
        if (!this._effects[effectTarget]) return new Decimal(1);
        // We want to apply the effects in order of operators, first add, then mult, then pow

        const effects = this._effects[effectTarget];
        const [add, mult, pow]: { effect: Numberish }[][] = [[], [], []];

        effects.forEach((e) => {
            const effect =
                typeof e.effect === "function" ? e.effect() : e.effect;
            if (e.operator === "add") add.push({ effect });
            if (e.operator === "mult") mult.push({ effect });
            if (e.operator === "pow") pow.push({ effect });
        });

        return new Decimal(1)
            .plus(Effect.plus(...add))
            .times(Effect.times(...mult))
            .pow(Effect.pow(...pow));
    }

    static times<TEffect extends { effect: Numberish }>(...effects: TEffect[]) {
        return effects.reduce(
            (acc, effect) => acc.times(effect.effect),
            new Decimal(1)
        );
    }

    static plus<TEffect extends { effect: Numberish }>(...effects: TEffect[]) {
        return effects.reduce(
            (acc, effect) => acc.plus(effect.effect),
            new Decimal(0)
        );
    }

    static pow<TEffect extends { effect: Numberish }>(...effects: TEffect[]) {
        return effects.reduce(
            (acc, effect) => acc.times(effect.effect),
            new Decimal(1)
        );
    }
}

export const EffectManager = new Effect();
