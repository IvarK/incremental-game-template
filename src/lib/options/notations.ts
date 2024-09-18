import { player } from "@/game/player";
import { DecimalSource } from "break_infinity.js";
import * as ADNotations from "@antimatter-dimensions/notations";

export type Notation =
    | "mixed scientific"
    | "scientific"
    | "engineering"
    | "standard";

const scientific = new ADNotations.ScientificNotation();
const engineering = new ADNotations.EngineeringNotation();
const standard = new ADNotations.StandardNotation();
const mixedScientific = new ADNotations.MixedScientificNotation();

export const format = (
    value: DecimalSource,
    places: number = 2,
    placesUnder1000: number = 0
) => {
    const notation = player.options.notation;

    switch (notation) {
        case "mixed scientific":
            return mixedScientific.format(value, places, placesUnder1000);
        case "scientific":
            return scientific.format(value, places, placesUnder1000);
        case "engineering":
            return engineering.format(value, places, places);
        case "standard":
            return standard.format(value, places, placesUnder1000);
    }
};

export const setNotation = (notation: Notation) => {
    player.options.notation = notation;
};
