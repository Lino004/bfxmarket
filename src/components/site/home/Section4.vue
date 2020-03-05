<template>
  <section class="bg-blue-grad-5" :style="`height: ${s4Height};`">
    <v-container grid-list-xl>
      <div class="text-center" v-animate-css="'fadeInDown'">
        <h2 class="headline font-weight-bold white--text">Avis des clients</h2>
      </div>
      <v-layout row wrap justify-center>
        <transition
          name="custom-classes-transition"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          mode="out-in"
          :duration="500"
          appear>
          <v-flex xs12 sm-4 v-if="!isClick" key="visible">
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
                  v-for="(client, i) in clients"
                  :key="i"
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
                              <v-btn
                                tile
                                depressed
                                small
                                color="primary"
                                @click="isClick = !isClick">
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
          <v-flex xs12 sm-4 v-else key="invisible">
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="3"
                  class="text-center d-none d-md-flex"
                >
                  <img :src="require('@/assets/img/contact01.jpg')"
                    height="300">
                </v-col>
                <v-col>
                  <v-row
                    align="center"
                    justify="start"
                    style="height: 100%; position: relative;"
                  >
                    <v-card
                      outlined
                      tile
                      color="transparent"
                      class="white--text"
                    >
                      <v-card-title>title</v-card-title>
                      <v-card-subtitle class="white--text">v-card-subtitle</v-card-subtitle>
                      <v-card-text class="white--text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Eos minus et autem qui vero vel eaque sit necessitatibus nemo possimus,
                        similique dignissimos odit sunt labore commodi repellendus
                        ipsum iure pariatur. <br>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Eos minus et autem qui vero vel eaque sit necessitatibus nemo possimus,
                        similique dignissimos odit sunt labore commodi repellendus
                        ipsum iure pariatur.
                      </v-card-text>
                    </v-card>
                    <v-btn
                      color="red"
                      dark
                      small
                      absolute
                      top
                      right
                      @click="isClick = !isClick"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-flex>
        </transition>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  data: () => ({
    model: null,
    clients: [
      {
        srcImg: '@/assets/img/contact01.jpg',
        name: 'Polette DUPONT',
        status: 'Trader Maser',
        comment: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Eos minus et autem qui vero vel eaque sit necessitatibus nemo possimus,
                  similique dignissimos odit sunt labore commodi repellendus
                  ipsum iure pariatur. <br>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Eos minus et autem qui vero vel eaque sit necessitatibus nemo possimus,
                  similique dignissimos odit sunt labore commodi repellendus
                  ipsum iure pariatur.`,
      },
      {
        srcImg: '@/assets/img/contact01.jpg',
        name: 'Polette DUPONT',
        status: 'Trader Maser',
        comment: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Eos minus et autem qui vero vel eaque sit necessitatibus nemo possimus,
                  similique dignissimos odit sunt labore commodi repellendus
                  ipsum iure pariatur. <br>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Eos minus et autem qui vero vel eaque sit necessitatibus nemo possimus,
                  similique dignissimos odit sunt labore commodi repellendus
                  ipsum iure pariatur.`,
      },
      {
        srcImg: '@/assets/img/contact01.jpg',
        name: 'Polette DUPONT',
        status: 'Trader Maser',
        comment: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Eos minus et autem qui vero vel eaque sit necessitatibus nemo possimus,
                  similique dignissimos odit sunt labore commodi repellendus
                  ipsum iure pariatur. <br>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Eos minus et autem qui vero vel eaque sit necessitatibus nemo possimus,
                  similique dignissimos odit sunt labore commodi repellendus
                  ipsum iure pariatur.`,
      },
      {
        srcImg: '@/assets/img/contact01.jpg',
        name: 'Polette DUPONT',
        status: 'Trader Maser',
        comment: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Eos minus et autem qui vero vel eaque sit necessitatibus nemo possimus,
                  similique dignissimos odit sunt labore commodi repellendus
                  ipsum iure pariatur. <br>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Eos minus et autem qui vero vel eaque sit necessitatibus nemo possimus,
                  similique dignissimos odit sunt labore commodi repellendus
                  ipsum iure pariatur.`,
      },
    ],
    isClick: false,
  }),
  computed: {
    currentClient() {
      if (this.model) return this.clients[this.model];
      return {
        srcImg: '',
        name: '',
        status: '',
        comment: '',
      };
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
