<template>
  <img
    src="https://www.countryflags.io/tr/flat/24.png"
    title="Türkçe"
    @click="$i18n.locale = 'tr'"
  />
  <img
    src="https://www.countryflags.io/gb/flat/24.png"
    title="English"
    @click="$i18n.locale = 'en'"
  />
</template>
<style scoped>
img {
  cursor: pointer;
}
</style>