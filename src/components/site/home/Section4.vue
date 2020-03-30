<template>
  <section class="" >
    <Bande position="right" title="Avis des étudiants"/>
    <v-container class="is-scroll is-invisible-scroll my-5" :style="`max-height: ${s4Height};`">
      <v-card flat v-for="(etu, index) in etudiants" :key="index">
        <v-card-text>
          <v-row class="mb-4" align="center">
            <v-avatar color="black" class="mr-4">
               <img
                  v-if="etu.img"
                  :src="etu.img"
                >
              <span
                v-else
                class="white--text headline">
                {{ userAbb(etu.name) }}
              </span>
            </v-avatar>
            <strong class="title">{{ etu.name }}</strong>
            <v-spacer></v-spacer>
          </v-row>

          <p class="black--text mb-0"  v-html="etu.comment">
          </p>

        </v-card-text>
      </v-card>
    </v-container>
  </section>
</template>

<script>
import Bande from '@/components/site/general/Bande.vue';

export default {
  components: { Bande },
  data: () => ({
    model: null,
    etudiants: [
      {
        img: 'https://blog-fr.orson.io/wp-content/uploads/2017/06/jpeg-ou-png.jpg',
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
        img: '',
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
        img: '',
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
        img: '',
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
      if (this.model) return this.etudiants[this.model];
      return {
        img: '',
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
  methods: {
    userAbb(name) {
      if (name) {
        const split = name.split(' ');
        return split[0][0] + split[1][0];
      }
      return '';
    },
  },
};
</script>

<style>

</style>
