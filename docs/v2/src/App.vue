<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" @click="click1">
    <hello-world/>
    <p>
      {{ state.key1 }}
    </p>
    <p>other comp</p>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import OtherComp from "./components/OtherComp.vue";
import { memory } from "./utils";

export default {
  name: "app",
  components: {
    HelloWorld,
    OtherComp
  },
  initialState() {
    return {
      key1: 12344
    };
  },
  mounted() {
    console.log("from app.vue", this.state, this.state.key1);
  },
  methods: {
    click1() {
      memory({
        key1: Math.random() + "value1"
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
