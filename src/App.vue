<template>
  <NavBar />
  <div class="container">
    <router-view />
    <LanguageSelector />
  </div>
</template>

<script>
import LanguageSelector from "./components/LanguageSelector.vue";
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",
  components: {
    LanguageSelector,
    NavBar,
  },
  data() {
    return {
      path: window.location.pathname,
    };
  },
  methods: {
    onClickLink(event) {
      this.path = event.currentTarget.attributes.href.value;
      window.history.pushState({}, "", this.path);
    },
  },
};
</script>
