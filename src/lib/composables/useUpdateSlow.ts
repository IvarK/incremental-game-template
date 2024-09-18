import { onUnmounted, shallowRef } from "vue";

export const useUpdateSlow = <T>(selector: () => T) => {
    const value = shallowRef(selector());

    const updateRefValue = () => {
        value.value = selector();
        timeOutRef = setTimeout(updateRefValue, 1000);
    };

    let timeOutRef = setTimeout(updateRefValue, 1000);

    onUnmounted(() => {
        clearTimeout(timeOutRef);
    });

    return value;
};
