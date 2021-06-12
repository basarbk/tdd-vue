<template>
  <div data-testid="user-page">
    <ProfileCard :user="user" v-if="!pendingApiCall && !failResponse" />
    <div class="alert alert-secondary text-center" v-if="pendingApiCall">
      <Spinner size="normal" />
    </div>
    <div class="alert alert-danger text-center" v-if="failResponse">
      {{ failResponse }}
    </div>
  </div>
</template>
<script>
import { getUserById } from "../api/apiCalls";
import ProfileCard from "../components/ProfileCard";
import Spinner from "../components/Spinner";
export default {
  name: "UserPage",
  components: { ProfileCard, Spinner },
  data() {
    return {
      user: {},
      pendingApiCall: true,
      failResponse: undefined,
    };
  },
  async mounted() {
    try {
      const response = await getUserById(this.$route.params.id);
      this.user = response.data;
    } catch (error) {
      this.failResponse = error.response.data.message;
    }
    this.pendingApiCall = false;
  },
};
</script>