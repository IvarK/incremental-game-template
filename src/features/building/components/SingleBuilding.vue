<script lang="ts" setup>
import { Building } from "@/features/building/core/building";
import { useUpdate } from "@/lib/composables/useUpdate";
import { format } from "@/lib/options/notations";

const props = defineProps<{ building: Building }>();

const canPurchase = useUpdate(() => props.building.canPurchase);
const amount = useUpdate(() => props.building.purchased);
const production = useUpdate(() => props.building.production);
</script>

<template>
    <div class="upgrade">
        <div>{{ amount }} owned</div>
        <h2>{{ building.name }}</h2>
        <p>{{ format(production) }} money/s</p>
        <p>Cost: {{ format(building.cost) }}</p>
        <button @click="building.purchase()" :class="{ canBuy: canPurchase }">
            Buy
        </button>
    </div>
</template>

<style scoped>
.upgrade {
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.canBuy {
    background-color: #408940;
}
</style>
