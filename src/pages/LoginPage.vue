<template>
  <div
    class="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
    data-testid="login-page"
  >
    <form class="card mt-5">
      <div class="card-header">
        <h1 class="text-center">{{ $t("login") }}</h1>
      </div>
      <div class="card-body">
        <Input id="e-mail" :label="$t('email')" v-model="email" />
        <Input
          id="password"
          :label="$t('password')"
          v-model="password"
          type="password"
        />
        <div class="alert alert-danger text-center" v-if="failMessage">
          {{ failMessage }}
        </div>
        <div class="text-center">
          <ButtonWithProgress
            :apiProgress="apiProgress"
            :disabled="isDisabled"
            :onClick="submit"
          >
            {{ $t("login") }}
          </ButtonWithProgress>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import ButtonWithProgress from "../components/ButtonWithProgress";
import Input from "../components/Input";
import { login } from "../api/apiCalls";
export default {
  components: {
    Input,
    ButtonWithProgress,
  },
  data() {
    return {
      email: "",
      password: "",
      apiProgress: false,
      failMessage: undefined,
    };
  },
  computed: {
    isDisabled() {
      return !(this.email && this.password);
    },
  },
  methods: {
    async submit() {
      this.apiProgress = true;
      try {
        await login({ email: this.email, password: this.password });
        this.$router.push("/");
      } catch (error) {
        this.failMessage = error.response.data.message;
      }
      this.apiProgress = false;
    },
  },
  watch: {
    email() {
      this.failMessage = undefined;
    },
    password() {
      this.failMessage = undefined;
    },
  },
};
</script>