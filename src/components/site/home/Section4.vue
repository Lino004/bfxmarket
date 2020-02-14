<template>
  <section>
    <v-container grid-list-xl>
      <v-layout row wrap justify-center class="my-12">
        <v-flex xs12 sm4>
          <v-card flat class="transparent">
            <v-card-title primary-title class="layout justify-center">
              <div class="headline">Company info</div>
            </v-card-title>
            <v-card-text>
              Cras facilisis mi vitae nunc lobortis pharetra.
              Nulla volutpat tincidunt ornare.
              Pellentesque habitant morbi tristique senectus
              et netus et malesuada fames ac turpis egestas.
              Nullam in aliquet odio. Aliquam eu est vitae
              tellus bibendum tincidunt. Suspendisse potenti.
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm4 offset-sm1>
          <v-card flat class="transparent">
            <v-card-title primary-title class="layout justify-center">
              <div class="headline">Contact us</div>
            </v-card-title>
            <v-card-text>
              Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
            </v-card-text>
            <v-list class="transparent">
              <v-list-item>
                <v-list-item-action>
                  <v-icon class="blue--text text--lighten-2">phone</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>777-867-5309</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-icon class="blue--text text--lighten-2">mdi-bus-marker</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Chicago, US</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-icon class="blue--text text--lighten-2">email</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>john@vuetifyjs.com</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
      <!-- <v-layout row wrap justify-center class="my-12">
        <v-sheet
          class="mx-auto"
          elevation="8"
          max-width="800"
        >
          <v-slide-group
            v-model="model"
            class="pa-4"
            center-active
            show-arrows
          >
            <v-slide-item
              v-for="n in 15"
              :key="n"
              v-slot:default="{ active, toggle }"
            >
              <v-card
                :color="active ? 'primary' : 'grey lighten-1'"
                class="ma-4"
                height="400"
                width="200"
                @click="toggle"
              >
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <v-scale-transition>
                    <v-icon
                      v-if="active"
                      color="white"
                      size="48"
                      v-text="'mdi-close-circle-outline'"
                    ></v-icon>
                  </v-scale-transition>
                </v-row>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </v-layout> -->
    </v-container>
  </section>
</template>

<script>
export default {
  data: () => ({
    model: null,
  }),
};
</script>

<style>

</style>
