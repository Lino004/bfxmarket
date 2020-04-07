<template>
  <v-row align="center" justify="center">
    <v-window
      v-model="onboarding"
      class="elevation-0"
    >
      <v-window-item
        v-for="n in length"
        :key="n"
      >
        <v-card flat>
          <v-card-text>
            <v-row class="mb-4" align="center">
              <strong class="title ml-3">Title {{ n }}</strong>
              <v-spacer></v-spacer>
              <v-btn icon @click="drawer = !drawer">
                <v-icon>mdi-menu</v-icon>
              </v-btn>
              <v-navigation-drawer v-if="drawer"
                v-model="drawer"
                absolute
                mobile-break-point="2710"
              >
                <v-list>
                  <v-list-item
                    v-for="(n, i) in length"
                    :key="i"
                    @click="onboarding = n - 1"
                  >
                    <v-list-item-title>Title {{ n }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-navigation-drawer>
            </v-row>

            <v-sheet class="textguideScroll" :style="`height: ${heigthTextGuidContent - reduce}px`">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                id est laborum.
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mo llit anim id est laborum.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </v-sheet>
          </v-card-text>
          <v-card-actions class="justify-space-between">
            <v-btn
              text
              @click="prev"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              text
              @click="next"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-window-item>
    </v-window>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    length: 3,
    onboarding: 0,
    isClick: false,
    drawer: false,
  }),
  computed: {
    ...mapGetters([
      'sizeWindows',
      'sizeTopBar',
      'sizePageTitle',
      'sizeFooter',
    ]),
    heigthTextGuidContent() {
      if (!this.sizeWindows || !this.sizeTopBar
         || !this.sizePageTitle || !this.sizeFooter) return 0;
      return this.sizeWindows.y
        - (this.sizeTopBar.y + this.sizePageTitle.y + this.sizeFooter.y * 2);
    },
    reduce() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 100;
        case 'sm': return 100;
        default: return 0;
      }
    },
  },
  methods: {
    next() {
      this.onboarding = this.onboarding + 1 === this.length
        ? 0
        : this.onboarding + 1;
    },
    prev() {
      this.onboarding = this.onboarding - 1 < 0
        ? this.length - 1
        : this.onboarding - 1;
    },
  },
};
</script>

<style>

</style>
