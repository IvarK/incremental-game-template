<script lang="ts" setup>
import { useUpdate } from "@/lib/composables/useUpdate";
import { Upgrade } from "@/features/upgrade/core/upgrade";
import { format } from "@/lib/options/notations";

const props = defineProps<{ upgrade: Upgrade }>();

const canPurchase = useUpdate(() => props.upgrade.canPurchase);
const hasUpgrade = useUpdate(() => props.upgrade.hasUpgrade);
</script>

<template>
    <div class="upgrade">
        <h2>{{ upgrade.description }}</h2>
        <p>Cost: {{ format(upgrade.cost) }}</p>
        <button
            v-if="!hasUpgrade"
            @click="upgrade.purchase()"
            :class="{ canBuy: canPurchase }"
        >
            Buy
        </button>
    </div>
</template>

<style scoped>
.upgrade {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.canBuy {
    background-color: #408940;
}
</style>
