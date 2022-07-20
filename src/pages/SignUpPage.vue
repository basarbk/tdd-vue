<template>
  <div
    class="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
    data-testid="signup-page"
  >
    <form class="mt-5" data-testid="form-sign-up" v-if="!signUpSuccess">
      <Card>
        <template v-slot:header>
          <h1>{{ $t("signUp") }}</h1>
        </template>
        <template v-slot:body>
          <Input
            id="username"
            :label="$t('username')"
            :help="errors.username"
            v-model="username"
          />
          <Input
            id="e-mail"
            :label="$t('email')"
            :help="errors.email"
            v-model="email"
          />
          <Input
            id="password"
            :label="$t('password')"
            :help="errors.password"
            v-model="password"
            type="password"
          />
          <Input
            id="password-repeat"
            :label="$t('passwordRepeat')"
            type="password"
            v-model="passwordRepeat"
            :help="hasPasswordMismatch ? $t('passwordMismatchValidation') : ''"
          />
          <div class="text-center">
            <ButtonWithProgress
              :apiProgress="apiProgress"
              :disabled="isDisabled"
              :onClick="submit"
            >
              {{ $t("signUp") }}
            </ButtonWithProgress>
          </div>
        </template>
      </Card>
    </form>
    <div class="alert alert-success mt-3" v-else>
      {{ $t("accountActivationNotification") }}
    </div>
  </div>
</template>
<script>
import { signUp } from "../api/apiCalls";
import Input from "../components/Input.vue";
import ButtonWithProgress from "../components/ButtonWithProgress.vue";
import Card from "../components/Card.vue";
export default {
  name: "SignUpPage",
  components: {
    Input,
    ButtonWithProgress,
    Card,
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
      apiProgress: false,
      signUpSuccess: false,
      errors: {},
    };
  },
  methods: {
    async submit() {
      this.apiProgress = true;
      try {
        await signUp({
          username: this.username,
          email: this.email,
          password: this.password,
        });
        this.signUpSuccess = true;
      } catch (error) {
        if (error.response.status === 400) {
          this.errors = error.response.data.validationErrors;
        }
        this.apiProgress = false;
      }
    },
  },
  computed: {
    isDisabled() {
      return this.password && this.passwordRepeat
        ? this.password !== this.passwordRepeat
        : true;
    },
    hasPasswordMismatch() {
      return this.password !== this.passwordRepeat;
    },
  },
  watch: {
    username() {
      delete this.errors.username;
    },
    email() {
      delete this.errors.email;
    },
    password() {
      delete this.errors.password;
    },
  },
};
</script>