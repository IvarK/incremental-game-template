<script lang="ts" setup>
import { useUpdate } from "@/lib/composables/useUpdate";
import { Upgrade } from "@/features/upgrade/core/upgrade";

const props = defineProps<{ upgrade: Upgrade }>();

const canPurchase = useUpdate(() => props.upgrade.canPurchase);
const hasUpgrade = useUpdate(() => props.upgrade.hasUpgrade);
</script>

<template>
    <div :class="{ canBuy: canPurchase }">
        <h2>{{ upgrade.description }}</h2>
        <div v-if="hasUpgrade">Owned</div>
        <p>Cost: {{ upgrade.cost }}</p>
        <button @click="upgrade.purchase()">Buy</button>
    </div>
</template>

<style scoped>
.canBuy {
    background-color: lightgreen;
}
</style>
