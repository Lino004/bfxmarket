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
        <v-list-item-title>Wfx School</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <div
        v-for="item in links"
        :key="item.title">
        <v-list-group
          v-if="item.hasOwnProperty('child')"
          :prepend-icon="item.icon"
          no-action>
          <template v-slot:activator>
            <v-list-item-title v-text="item.text"/>
          </template>
          <v-list-item
            v-for="(child, index) in item.child"
            :key="index"
            :to="child.to"
            :disabled="child.disabled">
            <v-list-item-title v-text="child.text"/>
            <v-list-item-icon>
              <v-icon> {{child.icon}} </v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-else
          :to="item.to"
          :disabled="item.disabled">
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="item.text"/>
        </v-list-item>
      </div>
    </v-list>

    <v-divider></v-divider>

    <v-list dense v-if="!user">
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-login</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <ModalAuth
            custum-class="black--text px-0"
            :type="'connexion'"/>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-account-plus</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <ModalAuth
            custum-class="black--text px-0"
            :type="'inscription'"/>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list dense v-else>
      <v-list-item link>
        <v-list-item-avatar color="grey">
          <span> {{userAbb}} </span>
        </v-list-item-avatar>

        <v-list-item-content>
          <span> {{userName.toUpperCase()}} </span>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="deconnexion">
        Déconnexion
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import menu from '@/services/menu';
import ModalAuth from '@/components/site/auth/ModalAuth.vue';

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
      'setUser',
    ]),
    deconnexion() {
      this.setUser(false);
      window.location.reload();
    },
  },
  mounted() {},
};
</script>

<style>

</style>
