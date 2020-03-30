<template>
  <v-app-bar
    :fixed="valueScroll > 20"
    :flat="valueScroll < 20"
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
    <div
      v-for="(link, i) in links"
      :key="i">
      <v-btn
        :to="link.to"
        text
        small
        class="ml-0 hidden-sm-and-down"
        v-if="link.child === undefined">
        <span class="white--text">{{ link.text }}</span>
      </v-btn>
     <v-menu
        open-on-hover
        offset-y
        transition="scale-transition"
        v-else
      >
        <template v-slot:activator="{ on }">
          <v-btn
            text
            small
            class="ml-0 hidden-sm-and-down white--text"
            v-on="on">
           <span class="white--text">{{ link.text }}</span>
           <v-icon right>mdi-menu-down</v-icon>

          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(linkChild, index) in link.child"
            :key="index"
            :to="linkChild.to"
          >
            <v-list-item-title>{{ linkChild.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
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
        <v-avatar color="black">
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
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    };
  },
  components: {
    ModalAuth,
  },
  computed: {
    ...mapGetters([
      'valueScroll',
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
