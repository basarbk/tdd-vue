<template>
  <div class="container">
    <SignUpPage />
    <LanguageSelector />
  </div>
</template>

<script>
import SignUpPage from "./pages/SignUpPage.vue";
import LanguageSelector from "./components/LanguageSelector.vue";
export default {
  name: "App",
  components: {
    SignUpPage,
    LanguageSelector,
  },
};
</script>