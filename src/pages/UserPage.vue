<template>
  <div data-testid="user-page">
    <ProfileCard :user="user" v-if="!pendingApiCall" />
    <div class="alert alert-secondary text-center" v-if="pendingApiCall">
      <Spinner size="normal" />
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
    };
  },
  async mounted() {
    const response = await getUserById(this.$route.params.id);
    this.user = response.data;
    this.pendingApiCall = false;
  },
};
</script>