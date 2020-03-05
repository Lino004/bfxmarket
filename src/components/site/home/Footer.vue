<template>
  <v-footer v-resize="onResize" class="bg-blue-grad">
    <v-container grid-list-xl>
      <v-card
        flat
        tile
        class="white--text text-center"
        color="transparent"
      >
        <v-card-text>
          <v-btn
            v-for="(icon, i) in icons"
            :key="i"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          2020 — <strong>h.ayinlamouhayad@gmail.com</strong>
        </v-card-text>
      </v-card>
    </v-container>
  </v-footer>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    icons: [
      'mdi-telegram',
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
  methods: {
    ...mapActions([
      'setSizeFooter',
    ]),
    onResize() {
      this.setSizeFooter({
        x: document.querySelector('.v-footer').clientWidth,
        y: document.querySelector('.v-footer').clientHeight,
      });
    },
  },
  mounted() {
    this.onResize();
  },
};
</script>

<style>

</style>
