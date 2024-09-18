import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { startMainLoop } from "@/game/loop/mainLoop";

createApp(App).mount("#app");

startMainLoop();
