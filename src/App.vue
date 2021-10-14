<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, computed, provide } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "App",
  components: {},

  setup() {
    const store = useStore();
    provide(
      "isMobile",
      computed(() => store.getters.isMobile)
    );
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
body {
}
</style>
