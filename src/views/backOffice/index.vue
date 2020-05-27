<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-avatar  class="bg-blue-grad">
          <v-img :src="require('@/assets/img/logo-white.png')"/>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Wfx School</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <Drawer/>
    </v-navigation-drawer>

    <v-app-bar
      app
      class="bg-blue-grad topbar px-4"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Tableau de bord</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
        style="align-items: start;"
      >
        <router-view/>
      </v-container>
    </v-content>

    <v-footer
      class="bg-blue-grad topbar px-4"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
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
};
</script>
