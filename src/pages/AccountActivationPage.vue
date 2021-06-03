<template>
  <div data-testid="activation-page">
    <div class="alert alert-success mt-3" v-if="success">
      Account is activated
    </div>
    <div class="alert alert-danger mt-3" v-if="fail">Activation failure</div>
    <span v-if="apiProgress" class="spinner-border" role="status"></span>
  </div>
</template>
<script>
import { activate } from "../api/apiCalls";
export default {
  data() {
    return {
      success: false,
      fail: false,
      apiProgress: false,
    };
  },
  async mounted() {
    this.apiProgress = true;
    try {
      await activate(this.$route.params.token);
      this.success = true;
    } catch (error) {
      this.fail = true;
    }
    this.apiProgress = false;
  },
};
</script>