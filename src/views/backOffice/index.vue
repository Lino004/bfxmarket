<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      color="dat-dash-bg"
    >
      <v-list-item
        :to="{ name: 'bfx-home' }"
        :style="`height: ${$vuetify.application.top}px`">
        <v-list-item-avatar  class="bg-blue-grad">
          <v-img :src="require('@/assets/img/logo-white.png')"/>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="white--text">Wfx School</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <Drawer/>
    </v-navigation-drawer>

    <v-app-bar
      app
      class="dat-bg-cyan topbar px-4 white--text"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Tableau de bord</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="deconnexion()">
        <v-icon color="white">mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="bg-blue-grad">
      <v-container
        class="fill-height bg-black-5"
        fluid
        style="align-items: start;"
      >
        <router-view/>
      </v-container>
    </v-main>
    <SnackComp/>
  </v-app>
</template>

<script>
import Drawer from '@/components/backOffice/Drawer.vue';
import SnackComp from '@/components/site/general/SnackComp.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    Drawer,
    SnackComp,
  },
  data: () => ({
    drawer: null,
  }),
  methods: {
    ...mapActions([
      'logoutAdmin',
    ]),
    async deconnexion() {
      await this.logoutAdmin();
      this.$router.replace('/');
    },
  },
};
</script>
