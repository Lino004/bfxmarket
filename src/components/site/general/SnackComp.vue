<template>
  <div>
    <v-snackbar v-model="isSchow" :color="colorSnack">
      {{ msgSnack }}
      <v-btn text dark @click="isSchow = false">Fermer</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'valueSnack',
      'colorSnack',
      'msgSnack',
    ]),
    isSchow: {
      get() {
        return this.valueSnack;
      },
      set(val) {
        this.setValueSnack(val);
      },
    },
  },
  methods: {
    ...mapMutations({
      setValueSnack: 'SET_VALUE_SNACK',
    }),
  },
};
</script>

<style>
</style>
