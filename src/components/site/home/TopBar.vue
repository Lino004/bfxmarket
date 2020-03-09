<template>
  <v-app-bar
    :fixed="valueScrollVideo > 10"
    :flat="valueScrollVideo < 10"
    v-resize="onResize"
    class="bg-blue-grad topbar">
    <v-container mx-auto py-0>
      <v-layout align-center>
        <v-img
          :src="require('@/assets/img/logo-white.png')"
          class="mr-5"
          contain
          height="48"
          width="48"
          max-width="48"/>
      </v-layout>
    </v-container>
    <v-spacer></v-spacer>
    <v-btn
      v-for="(link, i) in links"
      :key="i"
      :to="link.to"
      text
      small
      class="ml-0 hidden-sm-and-down">
      <span class="white--text">{{ link.text }}</span>
    </v-btn>
    <v-divider
      class="mx-4 hidden-sm-and-down"
      vertical
    ></v-divider>
    <ModalAuth v-if="!user"
      justify=""
      custum-class="mx-2 hidden-sm-and-down" :type="'connexion'"/>
    <ModalAuth v-if="!user"
      justify=""
      custum-class="mx-2 hidden-sm-and-down" :type="'inscription'"/>
    <div class="hidden-sm-and-down" v-else>
      <div class="d-flex justify-center align-center">
        <v-btn text color="white">
          {{ userName }}
        </v-btn>
        <v-avatar color="grey">
          <span class="white--text headline">
            {{ userAbb }}
          </span>
        </v-avatar>
      </div>
    </div>
    <v-btn
      color="white"
      text
      class="hidden-md-and-up"
      @click="setDrawer(!drawer)">
      <v-icon dark>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import menu from '@/services/menu';
import ModalAuth from '@/components/site/auth/ModalAuth.vue';

export default {
  data() {
    return {
      links: menu,
    };
  },
  components: {
    ModalAuth,
  },
  computed: {
    ...mapGetters([
      'valueScrollVideo',
      'drawer',
      'user',
    ]),
    userName() {
      if (this.user) {
        return `${this.user.nom.split(' ')[0]} ${this.user.prenom.split(' ')[0]}`;
      }
      return '';
    },
    userAbb() {
      if (this.user) {
        return `${this.user.nom[0]} ${this.user.prenom[0]}`;
      }
      return '';
    },
  },
  methods: {
    ...mapActions([
      'setSizeTopBar',
      'setDrawer',
    ]),
    onResize() {
      this.setSizeTopBar({
        x: document.querySelector('.topbar .v-toolbar__content').clientWidth,
        y: document.querySelector('.topbar .v-toolbar__content').clientHeight,
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
