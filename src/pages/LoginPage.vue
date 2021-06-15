<template>
  <div
    class="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
    data-testid="login-page"
  >
    <form class="mt-5">
      <Card>
        <template v-slot:header>
          <h1>{{ $t("login") }}</h1>
        </template>
        <template v-slot:body>
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
        </template>
      </Card>
    </form>
  </div>
</template>
<script>
import ButtonWithProgress from "../components/ButtonWithProgress";
import Card from "../components/Card";
import Input from "../components/Input";
import { login } from "../api/apiCalls";
export default {
  name: "LoginPage",
  components: {
    Input,
    ButtonWithProgress,
    Card,
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