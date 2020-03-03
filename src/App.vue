<template>
  <div>
    <router-view></router-view>
    <v-snackbar
      v-model="isEnDev"
      bottom
      color="#0ae915"
    >
      <p>Developpement en cours...</p>
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
    ]),
  },
  mounted() {},
};
</script>

<style>
@import url('./assets/css/general.css');
@import url('./assets/css/form.css');
@import url('./assets/css/elementor.css');
@import url('./assets/css/video.css');
</style>
