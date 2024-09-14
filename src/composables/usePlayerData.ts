import { onUnmounted, shallowRef } from "vue";
import { player, Player } from "../game/player";

export const usePlayerData = <T>(selector: (player: Player) => T) => {
    const value = shallowRef(selector(player));

    const updateRefValue = () => {
        value.value = selector(player);
        animationFrameRequest = requestAnimationFrame(updateRefValue);
    };

    let animationFrameRequest = requestAnimationFrame(updateRefValue);

    onUnmounted(() => {
        cancelAnimationFrame(animationFrameRequest);
    });

    return value;
};
