<script setup lang="ts">
import SingleUpgrade from "@/features/upgrade/components/SingleUpgrade.vue";
import { MoneyUpgrades } from "@/features/upgrade/core/upgradeDb";
import { player } from "@/game/player";
import { usePlayerData } from "@/lib/composables/usePlayerData";

const money = usePlayerData((player) => player.currencies.money);

const addMoney = () => {
    player.currencies.money = player.currencies.money.plus(1);
};
</script>

<template>
    <button @click="addMoney">Add money</button>
    <p>Money: {{ money }}</p>
    <SingleUpgrade
        v-for="upgrade in MoneyUpgrades.all"
        :key="upgrade.id"
        :upgrade="upgrade"
    />
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
