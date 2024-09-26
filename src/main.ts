import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { startLoops } from "@/game/loop/mainLoop";
import { Events } from "@/lib/util/events";
import { EVENT } from "@/game/enum/eventTypes";
import { load, save } from "@/lib/options/storage";

createApp(App).mount("#app");

load();
startLoops();

Events.on(EVENT.SAVE_GAME, save);
