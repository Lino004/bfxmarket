<template>
  <div>
    <v-snackbar v-model="snackbar" :color="color">
      {{ text }}
      <v-btn text @click="snackbar = false">Fermer</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '',
    },
    colorBtn: {
      type: String,
      default: '',
    },
  },
  computed: {
    snackbar: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('change', val);
      },
    },
  },
};
</script>

<style>
</style>
