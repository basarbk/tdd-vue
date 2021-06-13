<template>
  <div
    class="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
    data-testid="login-page"
  >
    <form class="card mt-5">
      <div class="card-header">
        <h1 class="text-center">Login</h1>
      </div>
      <div class="card-body">
        <Input id="e-mail" label="E-mail" v-model="email" />
        <Input
          id="password"
          label="Password"
          v-model="password"
          type="password"
        />
        <div class="text-center">
          <button class="btn btn-primary" disabled>Login</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Input from "../components/Input";
export default {
  components: {
    Input,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>