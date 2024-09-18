import { shallowRef } from "vue";

export const useUpdateLazy = <T>(selector: () => T) => {
    const value = shallowRef(selector());

    const updateRefValue = () => {
        value.value = selector();
    };

    return { value, invalidate: updateRefValue };
};
