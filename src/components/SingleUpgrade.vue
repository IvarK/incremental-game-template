<script lang="ts" setup>
import { useUpdate } from "../composables/useUpdate";
import { Upgrade } from "../lib/classes/upgrade";

const props = defineProps<{ upgrade: Upgrade }>();

const canPurchase = useUpdate(() => {
    return props.upgrade.canPurchase;
});
</script>

<template>
    <!-- This is reactive -->
    <div :class="{ canBuy: canPurchase }">
        <h2>{{ upgrade.description }}</h2>
        <!-- This is also reactive, why? -->
        <div v-if="upgrade.hasUpgrade">Owned</div>
        <p>Cost: {{ upgrade.cost }}</p>
        <button @click="upgrade.purchase()">Buy</button>
    </div>
</template>

<style scoped>
.canBuy {
    background-color: lightgreen;
}
</style>
