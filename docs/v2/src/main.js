import App from "./App.vue";
import { reduxVueBoot } from "./utils";

reduxVueBoot(App, "app", {
  connect: false,
  config: {
    productionTip: false
  }
});
