<template>
  <section>
    <v-container grid-list-xl>
      <v-layout row wrap justify-center class="">
        <v-flex xs12 sm-4>
          <v-sheet
            color="transparent"
            class="mx-auto"
            max-width="800"
          >
            <v-slide-group
              v-model="model"
              center-active
              show-arrows
            >
              <v-slide-item
                v-for="n in 15"
                :key="n"
                v-slot:default="{ active, toggle }"
              >
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    class="ma-4"
                    width="200"
                    @click="toggle"
                  >

                    <v-img width="200" :src="require('@/assets/contact01.jpg')">
                      <v-expand-transition>
                        <div
                          v-if="hover"
                          class="`d-flex transition-fast-in-fast-out
                                  blueTranp v-card--reveal`"
                          style="height: 100%;"
                        >
                          <v-container>
                            <v-row align="center" justify="center" class="white--text">
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dict</p>
                            </v-row>
                          </v-container>
                        </div>
                      </v-expand-transition>
                    </v-img>
                  </v-card>
                </v-hover>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-flex>
      </v-layout>
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
