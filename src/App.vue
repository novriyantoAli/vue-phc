<template>
  <v-app teal>
    <NavBar v-show="getStatusLogin" />
    <v-content>
      <router-view />
    </v-content>
    <v-footer color="blue darken-4" app>
      <span class="white--text">IT Elektrikal © 2021</span>
    </v-footer>
  </v-app>
</template>
 
<script>
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: {
    NavBar,
  },
  data: () => ({
    //
  }),
  computed: {
    getStatusLogin: function () {
      console.log(this.$store);

      return this.$store.state.isLogin;
    },
  },
};
</script>