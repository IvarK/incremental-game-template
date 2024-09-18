<script setup lang="ts">
import SingleBuilding from "@/features/building/components/SingleBuilding.vue";
import { Buildings } from "@/features/building/core/buildingDb";
import SingleUpgrade from "@/features/upgrade/components/SingleUpgrade.vue";
import { MoneyUpgrades } from "@/features/upgrade/core/upgradeDb";
import { player } from "@/game/player";
import { usePlayerData } from "@/lib/composables/usePlayerData";
import { format } from "@/lib/options/notations";

const money = usePlayerData((player) => player.currencies.money);

const addMoney = () => {
    player.currencies.money = player.currencies.money.plus(1);
};
</script>

<template>
    <button @click="addMoney">Add money</button>
    <p>Money: {{ format(money) }}</p>
    <div class="container-container">
        <div class="class-container">
            <SingleUpgrade
                v-for="upgrade in MoneyUpgrades.all"
                :key="upgrade.id"
                :upgrade="upgrade"
            />
        </div>

        <div class="class-container">
            <SingleBuilding
                v-for="building in Buildings.all"
                :key="building.id"
                :building="building"
            />
        </div>
    </div>
</template>

<style scoped>
/* Nice naming bro */
.container-container {
    display: flex;
    gap: 10px;
    justify-content: center;
}

.class-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
