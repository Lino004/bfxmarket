<template>
  <v-footer :fixed="isFixed" v-resize="onResize" class="bg-blue-grad">
    <v-container class="pa-0" v-if="isFixed">
      <v-card
        flat
        tile
        class="white--text text-center"
        color="transparent">
        <v-btn
          class="white--text"
          icon
          small
          @click="showFooter = !showFooter">
          <v-icon> {{showFooter ? 'mdi-chevron-down' : 'mdi-chevron-up'}} </v-icon>
        </v-btn>
      </v-card>
    </v-container>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
      :duration="500"
      appear>
      <v-container v-if="showFooter" grid-list-xl>
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
    </transition>
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
    showFooter: true,
  }),
  watch: {
    isFixed: {
      handler(val) {
        if (val) this.showFooter = false;
        else this.showFooter = true;
      },
      immediate: true,
    },
  },
  computed: {
    isFixed() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true;
        case 'sm': return true;
        default: return false;
      }
    },
  },
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