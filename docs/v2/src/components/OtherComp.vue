<template>
  <div class="hello">
    <h5>{{ state.key1 }}</h5>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
    </p>
  </div>
</template>

<script>
import { memory } from '../utils'
export default {
  name: "otherCmp",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
