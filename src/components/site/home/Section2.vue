<template>
  <section>
    <v-layout
      column
      wrap
      class="py-10"
      align-center
    >
      <v-flex xs12 sm4 class="my-4">
        <div class="text-center" v-animate-css="'fadeInDown'">
          <h2 class="headline font-weight-bold">
            Profiter des meilleurs formations du moment
          </h2>
        </div>
      </v-flex>
      <v-flex xs12>
        <v-container grid-list-xl>
          <v-row justify="space-between">
            <v-col md="3" class="mb-3" v-for="(formation, i) in listeFormation" :key="i">
              <v-layout justify-center>
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    :elevation="hover ? 12 : 2"
                    max-width="300"
                    v-animate-css="{
                      classes: 'zoomIn',
                      duration: 4000 + i * 2000,
                    }">
                    <v-img
                      class="align-end"
                      :class="formation.active ? 'white--text card-bg-img-black'
                                               : 'grey--text card-bg-img-grey'"
                      :src="formation.img"
                      max-height="200"
                    >
                      <v-card-title class="title white--text">
                        <v-row
                          class="fill-height flex-column"
                          justify="space-between"
                        >
                          <v-icon size="90" v-if="!formation.active">mdi-lock</v-icon>
                          <p class="mb-0 subheading text-center"
                             :class="{'grey--text': !formation.active}">
                            {{ formation.title }}
                          </p>
                        </v-row>
                      </v-card-title>
                    </v-img>
                    <v-card-text
                      :class="formation.active ? 'black--text' : 'grey--text'">
                      {{formation.content}}
                    </v-card-text>
                    <v-card-actions>
                      <v-layout justify-center class="ma-2">
                        <v-btn
                          small
                          :color="formation.active ? 'primary' : 'grey'"
                          @click="setEnDev(true)">
                          Débuter la formation
                        </v-btn>
                      </v-layout>
                    </v-card-actions>
                  </v-card>
                </v-hover>
              </v-layout>
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      animationInfinite: {
        classes: 'fadeIn',
        duration: 5000,
        iteration: 'infinite',
      },
      listeFormation: [
        {
          title: 'Formation Débutant',
          img: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          content: 'Ad ut voluptate reprehenderit incididunt excepteur occaecat. Magna quis ut quis cupidatat mollit fugiat esse cupidatat dolor sint est est commodo minim.',
          active: true,
        },
        {
          title: 'Formation Avancé',
          img: 'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          content: 'Ad ut voluptate reprehenderit incididunt excepteur occaecat. Magna quis ut quis cupidatat mollit fugiat esse cupidatat dolor sint est est commodo minim.',
          active: false,
        },
        {
          title: 'Formation Professionnel',
          img: 'https://images.pexels.com/photos/186464/pexels-photo-186464.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
          content: 'Ad ut voluptate reprehenderit incididunt excepteur occaecat. Magna quis ut quis cupidatat mollit fugiat esse cupidatat dolor sint est est commodo minim.',
          active: false,
        },
      ],
    };
  },
  computed: {
    margeAuto() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'my-2';
        default: return 'mx-2';
      }
    },
  },
  methods: {
    ...mapActions([
      'setEnDev',
    ]),
  },
  mounted() {},
};
</script>

<style>

</style>
