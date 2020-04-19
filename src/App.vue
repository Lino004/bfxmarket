<template>
  <div id="scroll-target">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  data: () => ({
    //
  }),
  computed: {},
  methods: {
    ...mapActions([
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
@import url('./assets/css/uploadImg.css');
</style>
