<template>
  <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
    <form class="card mt-5" data-testid="form-sign-up" v-if="!signUpSuccess">
      <div class="card-header">
        <h1 class="text-center">Sign Up</h1>
      </div>
      <div class="card-body">
        <Input
          id="username"
          label="Username"
          :help="errors.username"
          v-model="username"
        />
        <Input
          id="e-mail"
          label="E-mail"
          :help="errors.email"
          v-model="email"
        />
        <Input
          id="password"
          label="Password"
          :help="errors.password"
          v-model="password"
          type="password"
        />
        <div class="mb-3">
          <label for="password-repeat" class="form-label"
            >Password Repeat</label
          >
          <input
            id="password-repeat"
            type="password"
            v-model="passwordRepeat"
            class="form-control"
          />
        </div>
        <div class="text-center">
          <button
            class="btn btn-primary"
            :disabled="isDisabled || apiProgress"
            @click.prevent="submit"
          >
            <span
              v-if="apiProgress"
              class="spinner-border spinner-border-sm"
              role="status"
            ></span>
            Sign Up
          </button>
        </div>
      </div>
    </form>
    <div class="alert alert-success mt-3" v-else>
      Please check your e-mail to activate your account
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Input from "../components/Input";
export default {
  name: "SignUpPage",
  components: {
    Input,
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
    submit() {
      this.apiProgress = true;
      axios
        .post("/api/1.0/users", {
          username: this.username,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.signUpSuccess = true;
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.errors = error.response.data.validationErrors;
          }
          this.apiProgress = false;
        });
    },
  },
  computed: {
    isDisabled() {
      return this.password && this.passwordRepeat
        ? this.password !== this.passwordRepeat
        : true;
    },
  },
};
</script>