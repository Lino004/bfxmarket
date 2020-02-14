<template>
  <div>
    <router-view></router-view>
    <v-snackbar
      v-model="isEnDev"
      top
      :color="'primary'"
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
