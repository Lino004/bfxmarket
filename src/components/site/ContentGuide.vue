<template>
  <v-row align="center" justify="center">
    <v-window
      v-model="onboarding"
      class="elevation-1"
    >
      <v-window-item
        v-for="n in length"
        :key="n"
      >
        <v-card flat>
          <v-card-text>
            <v-row class="mb-4" align="center">
              <v-avatar color="grey" class="mr-4"></v-avatar>
              <strong class="title">Title {{ n }}</strong>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </v-row>

            <v-sheet>
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
            <v-item-group
              v-model="onboarding"
              class="text-center"
              mandatory
            >
              <v-item
                v-for="n in length"
                :key="`btn-${n}`"
                v-slot:default="{ active, toggle }"
              >
                <v-btn
                  :input-value="active"
                  icon
                  @click="toggle"
                >
                  <v-icon>mdi-record</v-icon>
                </v-btn>
              </v-item>
            </v-item-group>
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
export default {
  data: () => ({
    length: 3,
    onboarding: 0,
    isClick: false,
  }),
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
    s4Height() {
      if (this.isClick) {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return '500px';
          default: return '400px';
        }
      }
      return '400px';
    },
  },
};
</script>

<style>

</style>
