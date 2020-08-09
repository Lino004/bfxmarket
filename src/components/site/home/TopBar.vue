<template>
  <v-app-bar
    :fixed="valueScroll > 20"
    :flat="valueScroll < 20"
    v-resize="onResize"
    class="bg-blue-grad topbar px-4">
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
        v-if="userStatus === 'Online' && link.child"
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
    <ModalAuth v-if="userStatus !== 'Online'"
      justify=""
      custum-class="mx-2 hidden-sm-and-down" :type="'connexion'"/>
    <ModalAuth v-if="userStatus !== 'Online'"
      justify=""
      custum-class="mx-2 hidden-sm-and-down" :type="'inscription'"/>
    <div class="hidden-sm-and-down" v-else>
      <div class="d-flex justify-center align-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <div v-on="on"><AvatarUser/></div>
          </template>
          <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <AvatarUser/>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ userName }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-avatar
                    left
                    class="green white--text"
                    size="30"
                    v-on="on">
                    {{user.downline}}
                  </v-avatar>
                </template>
                <span>Nomdre de parrainage</span>
              </v-tooltip>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item @click="copieLien">
            <v-list-item-icon>
              <v-icon>mdi-link</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Copier le lien de parrainage</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'private-connexion' }" v-if="user.is_ad">
            <v-list-item-icon>
              <v-icon>mdi-vector-union</v-icon>
            </v-list-item-icon>
            <v-list-item-title>BackOffice</v-list-item-title>
          </v-list-item>
          <v-list-item @click="deconnexion">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Déconnexion</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
        </v-menu>
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
import AvatarUser from '@/components/site/general/AvatarUser.vue';

export default {
  components: {
    ModalAuth,
    AvatarUser,
  },
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
  computed: {
    ...mapGetters([
      'valueScroll',
      'drawer',
      'user',
      'userStatus',
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
      'logout',
      'showSnackMsg',
    ]),
    onResize() {
      this.setSizeTopBar({
        x: document.querySelector('.topbar .v-toolbar__content').clientWidth,
        y: document.querySelector('.topbar .v-toolbar__content').clientHeight,
      });
    },
    async copieLien() {
      try {
        const getUrl = window.location;
        await this.$copyText(`${getUrl.protocol}//${getUrl.host}/home/parrainage/${this.user.identifiant_url}`);
        this.showSnackMsg({
          msg: 'Lien de parrainage copié',
          color: 'success',
        });
      } catch (error) {
        this.showSnackMsg({
          msg: 'Problème lors de la copie',
          color: 'error',
        });
      }
    },
    async deconnexion() {
      await this.logout();
      window.location.reload();
    },
  },
  mounted() {
    this.onResize();
  },
};
</script>

<style>

</style>
