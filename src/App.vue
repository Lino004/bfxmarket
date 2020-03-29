<template>
  <div id="scroll-target">
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
      'setValueScroll',
    ]),
    verifUser() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) this.setUser(user);
    },
    onScroll(e) {
      this.setValueScroll(e.target.scrollTop);
    },
    addEvent() {
      const element = document.querySelector('#scroll-target');
      element.addEventListener('scroll', this.onScroll);
    },
    removeEvent() {
      const element = document.querySelector('#scroll-target');
      element.removeEventListener('scroll', this.onScroll);
    },
  },
  mounted() {
    this.verifUser();
    this.addEvent();
  },
  destroyed() {
    this.removeEvent();
  },
};
</script>

<style>
@import url('./assets/css/general.css');
@import url('./assets/css/elementor.css');
@import url('./assets/css/countdown.css');
</style>
