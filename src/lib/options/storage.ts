import Decimal from "break_infinity.js"
import { Player } from "../../game/player"
import gameConfig from "../../gameConfig"
import { useCurrencyStore } from "../stores/useCurrencyStore"
import { useOptionStore } from "../stores/useOptionStore"
import { useRebuyableUpgradeStore } from "../stores/useRebuyableUpgradeStore"
import { useUpgradeStore } from "../stores/useUpgradeStore"

export const save = () => {
    const save: Player = {
        currencies: useCurrencyStore.getState().currencies,
        upgrades: useUpgradeStore.getState().upgrades,
        rebuyableUpgrades: useRebuyableUpgradeStore.getState().rebuyableUpgrades,
        options: useOptionStore.getState().options,
    }

    localStorage.setItem(gameConfig.gameId, btoa(JSON.stringify(save)))
}

export const load = () => {
    const save = localStorage.getItem(gameConfig.gameId)
    if (save) {
        const parsedSave = JSON.parse(atob(save))
        Object.keys(parsedSave.currencies).forEach(key => parsedSave.currencies[key] = new Decimal(parsedSave.currencies[key]))
        useCurrencyStore.setState({ currencies: parsedSave.currencies })
        useUpgradeStore.setState({ upgrades: parsedSave.upgrades })
        useRebuyableUpgradeStore.setState({ rebuyableUpgrades: parsedSave.rebuyableUpgrades })
        useOptionStore.setState({ options: parsedSave.options })
    }
}