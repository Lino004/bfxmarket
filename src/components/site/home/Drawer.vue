<template>
  <v-navigation-drawer
    v-model="useDrawer"
    fixed
    temporary
  >
    <v-list-item class="bg-blue-grad">
      <v-list-item-avatar>
        <v-img :src="require('@/assets/img/logo-white.png')"/>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>Blue FxMarket</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="item in links"
        :key="item.title"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title @click="$router.push(item.to)">{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-login</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <ModalAuth
            custum-class="black--text"
            :type="'connexion'"
            justify="start"/>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-account-plus</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <ModalAuth
            custum-class="black--text"
            :type="'inscription'"
            justify="start"/>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import menu from '@/services/menu';
import ModalAuth from '@/components/site/home/ModalAuth.vue';

export default {
  components: {
    ModalAuth,
  },
  data() {
    return {
      links: menu,
    };
  },
  computed: {
    ...mapGetters([
      'drawer',
    ]),
    useDrawer: {
      get() {
        return this.drawer;
      },
      set(val) {
        this.setDrawer(val);
      },
    },
  },
  methods: {
    ...mapActions([
      'setDrawer',
    ]),
  },
  mounted() {},
};
</script>

<style>

</style>
