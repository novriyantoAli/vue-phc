<template>
  <section>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="mx-auto">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  label="NIK"
                  v-model="nik"
                  prepend-icon="email"
                  type="number"
                  :rules="numberRules"
                  required>
                </v-text-field>

                <v-text-field
                  label="Password"
                  v-model="password"
                  prepend-icon="lock"
                  type="password"
                  :rules="passwordRules"
                  required
                >
                </v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="primary" :disabled="!valid" @click="doLogin">
                <span class="spinner-border spinner-border-sm" v-show="loading"></span> Login
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-snackbar v-model="snackbar" bottom>
            {{ error_message }}
          </v-snackbar>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
 
<script>
import { authenticationService } from '@/_services';
export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    snackbar: false,
    valid: true,
    nik: "",
    numberRules: [
      (v) => v.length > 0 || "This field may not be empty",
      (v) =>
        Number.isInteger(Number(v)) || "The value must be an integer number",
      (v) => v > 0 || "The value must be greater than zero",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length >= 6) || "Password must be larger than 6 characters",
    ],
    result: null,
    error_message: "",
  }),
  created () {
    // redirect to home if already logged in
    if (authenticationService.currentUserValue) { 
      return this.$router.push({ name: "home" });
    }
    // get return url from route parameters or default to '/'
    this.returnUrl = this.$route.query.returnUrl || '/';
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    doLogin() {
      this.loading = true

      authenticationService.login(this.nik, this.password).then(
        user => {
          this.error_message = "wellcome "+user.nik;
          this.$router.push(this.returnUrl);
          this.loading = false
        }, 
        error => {
          console.log(error);

          this.loading = false;
          this.error_message = error;
          this.snackbar = true;
        }
      );
      // axios
      //   .post("http://localhost:3000/api/login", form).then((response) => {
      //     this.result = response.data;
      //     this.$store.state.user = this.result.nik;
      //     this.$store.state.isLogin = true;
      //     this.$store.state.jwt_token = this.result.token;
      //     this.$router.push({ name: "Profile" });

          // if (this.result.token) {
          //   axios
          //     .get("http://localhost:3000/api/user", {
          //       headers: {
          //         Authorization: "Bearer " + this.result.token,
          //       },
          //     })
          //     .then((response) => {
          //       this.result = response.data;
          //       if (this.result.user) {
          //         this.$store.state.user = this.result.user;
          //         this.$store.state.isLogin = true;
          //         this.$store.state.jwt_token = this.result.token;
          //         this.$router.push({ name: "Profile" });
          //       } else {
          //         this.error_message = response.data.status;
          //         this.snackbar = true;
          //       }
          //     });
          // }
        // })
        // .catch((e) => {
        //   if (e.response && e.response.status !== 200) {
        //     this.error_message = e.response.data.error;
        //     this.snackbar = true;
        //   }
        // });
    },
  },
};
</script>