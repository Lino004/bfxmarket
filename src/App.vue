<template>
  <div>
    <router-view></router-view>
    <v-snackbar
      v-model="isEnDev"
      bottom
      :color="'info'"
    >
      Developpement en cours...
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters([
      'enDev',
    ]),
    isEnDev: {
      get() {
        return this.enDev;
      },
      set(val) {
        this.setEnDev(val);
      },
    },
  },
  methods: {
    ...mapActions([
      'setEnDev',
      'setUser',
    ]),
    verifUser() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) this.setUser(user);
    },
  },
  mounted() {
    this.verifUser();
  },
};
</script>

<style>
@import url('./assets/css/general.css');
@import url('./assets/css/elementor.css');
@import url('./assets/css/video.css');
</style>
