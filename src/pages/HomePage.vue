<template>
  <div data-testid="home-page">
    <UserList />
  </div>
</template>
<script>
import UserList from "../components/UserList";
export default {
  components: {
    UserList,
  },
};
</script>