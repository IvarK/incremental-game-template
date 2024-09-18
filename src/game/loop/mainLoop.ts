import { Buildings } from "@/features/building/core/buildingDb";
import { player } from "@/game/player";

const tick = (diff: number) => {
    for (const building of Buildings.all) {
        building.tick(diff);
    }
};

export const startMainLoop = () => {
    const loop = () => {
        const now = Date.now();
        const diff = now - player.lastTick;

        tick(diff);

        player.lastTick = now;
    };

    setInterval(loop, 30);
};
