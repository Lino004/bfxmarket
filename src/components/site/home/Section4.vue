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

                    <v-img width="200" :src="require('@/assets/img/contact01.jpg')">
                      <div
                        class="d-flex v-card--reveal"
                        :class="{'border-blue': hover}"
                        style="height: 100%;"
                        v-if="hover"
                      >
                          <v-row
                            class="fill-height"
                            align="start"
                            justify="end"
                          >
                            <v-btn tile depressed small color="primary">
                              <v-icon class="mr-2">mdi-plus</v-icon>
                            </v-btn>
                          </v-row>
                      </div>
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
