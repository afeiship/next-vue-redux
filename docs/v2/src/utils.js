import { createStore } from "redux";
import Vue from "vue";

let app = null;
let options = { connect: true };

// reducers:
const reducers = (state = {}, action) => {
  return Object.assign(state, action.data);
};

const store = createStore(reducers);

const reduxMixin = {
  connect: options.connect,
  data() {
    return {
      state: {}
    };
  },
  beforeMount() {
    if (this.$options.connect) {
      this.state = memory(app.initialState());
      this.unsubscribe = store.subscribe(() => {
        this.state = memory();
      });
    }
  },
  beforeDestroy() {
    this.unsubscribe();
  }
};

const reduxVueBoot = (inApp, inId, inOptions) => {
  app = inApp;
  options = inOptions;
  Vue.mixin(reduxMixin);
  new Vue({
    render: h => h(inApp)
  }).$mount(`#${inId}`);
};

function memory(inData) {
  if (typeof inData === "undefined") {
    return store.getState();
  } else {
    store.dispatch({
      type: "memory",
      data: inData
    });
    return store.getState();
  }
}

export { reduxVueBoot, memory };
