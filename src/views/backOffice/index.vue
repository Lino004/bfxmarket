<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      color="dat-dash-bg"
    >
      <v-list-item :style="`height: ${$vuetify.application.top}px`">
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
    </v-app-bar>

    <v-content class="bg-blue-grad">
      <v-container
        class="fill-height bg-black-5"
        fluid
        style="align-items: start;"
      >
        <router-view/>
      </v-container>
    </v-content>
    <SnackComp/>
  </v-app>
</template>

<script>
import Drawer from '@/components/backOffice/Drawer.vue';
import SnackComp from '@/components/site/general/SnackComp.vue';

export default {
  components: {
    Drawer,
    SnackComp,
  },
  data: () => ({
    drawer: null,
  }),
  mounted() {},
};
</script>
