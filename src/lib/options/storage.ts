import Decimal from "break_infinity.js";
import { Player, player } from "../../game/player";
import gameConfig from "../../gameConfig";

export const save = () => {
    localStorage.setItem(gameConfig.gameId, btoa(JSON.stringify(player)));
};

export const load = () => {
    const save = localStorage.getItem(gameConfig.gameId);
    if (save) {
        const parsedSave = JSON.parse(atob(save));
        Object.keys(parsedSave.currencies).forEach(
            (key) =>
                (parsedSave.currencies[key] = new Decimal(
                    parsedSave.currencies[key]
                ))
        );
        Object.keys(player).forEach(
            (key) => (player[key as keyof Player] = parsedSave[key])
        );
    }
};
