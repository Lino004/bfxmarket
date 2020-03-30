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
              <CardImg
                :data="formation"
                :index="i"
                dataBtn="Débuter la formation"
                @action="setEnDev(true)"/>
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import CardImg from '@/components/site/general/CardImg.vue';

export default {
  components: { CardImg },
  data() {
    return {
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
  computed: {},
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
