<template>
  <button
    class="btn btn-primary"
    :disabled="disabled || apiProgress"
    @click.prevent="onClick"
  >
    <Spinner v-if="apiProgress" />
    <slot>Button</slot>
  </button>
</template>
<script>
import Spinner from "./Spinner.vue";
export default {
  components: {
    Spinner,
  },
  props: {
    apiProgress: Boolean,
    disabled: Boolean,
    onClick: Function,
  },
};
</script>