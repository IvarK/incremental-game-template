/// <reference types="vite/client" />

type FormatFunction = (
    value: import("break_infinity.js").DecimalSource,
    places: number,
    placesUnder1000: number
) => string;

declare module "@antimatter-dimensions/notations" {
    export class ScientificNotation {
        format: FormatFunction;
    }

    export class EngineeringNotation {
        format: FormatFunction;
    }

    export class StandardNotation {
        format: FormatFunction;
    }

    export class MixedScientificNotation {
        format: FormatFunction;
    }
}
