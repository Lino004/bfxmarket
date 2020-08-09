<template>
  <div style="width: 100%" class="ma-3">
    <v-row align="center">
      <v-col>
        <h2>Liste des utilisateurs</h2>
      </v-col>
      <v-col cols="auto" class="text-end">
        <v-row>
          <v-col cols="auto">
            <v-btn
              small
              :color="employer ? 'primary' : 'gray'"
              @click="swithToEmployer">
              <v-icon left> {{employer ? 'mdi-eye' : 'mdi-eye-off'}}</v-icon> Liste des Employer
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-menu offset-y >
              <template v-slot:activator="{ on }">
                <v-btn
                  small
                  color="primary"
                  :disabled="!usersSelect.length"
                  v-on="on">
                  Actions ( {{usersSelect.length}} )
                </v-btn>
              </template>
              <v-list dense>
                <v-list-item
                  v-for="(action, i) in listeActions.filter(el => el.show)"
                  :key="i"
                  @click="actionShowModal(action.component)">
                  <v-list-item-title> {{action.libelle}} </v-list-item-title>
                </v-list-item>
                <!-- <v-list-item @click="actionShowModal('EnvoiEmail')">
                  <v-list-item-title>Envoyer des e-mails</v-list-item-title>
                </v-list-item>
                <v-list-item @click="actionShowModal('ArchiveUser')">
                  <v-list-item-title>Archiver des utilisateurs</v-list-item-title>
                </v-list-item> -->
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <div class="mt-1">
      <h3>Champs de recherche</h3>
      <v-row align="center" justify="center">
        <v-col cols="12" md="10" class="pt-0 pb-0">
          <v-row>
            <v-col cols="6" md="3">
              <v-text-field
                label="Nom"
                outlined
                v-model="search.nom"
                hide-details
                dark
                @keyup.enter="getList('search')"/>
            </v-col>
            <v-col cols="6" md="2">
              <v-text-field
                label="Prenom"
                outlined
                v-model="search.prenom"
                hide-details
                dark
                @keyup.enter="getList('search')"/>
            </v-col>
            <v-col cols="6" md="2">
              <v-autocomplete
                v-model="search.pays_id"
                :items="listePays"
                item-text="nom"
                item-value="id"
                hide-details
                outlined
                expanded
                label="Pays"
                dark
                clearable
                @keyup.enter="getList('search')"
                @change="getList('search')"
                v-if="!employer"
              ></v-autocomplete>
              <v-select
                v-model="search.role"
                :items="config.LISTE"
                item-text="libelle"
                item-value="role"
                hide-details
                outlined
                expanded
                label="Rôle"
                dark
                clearable
                @keyup.enter="getList('search')"
                @change="getList('search')"
                v-else
              ></v-select>
            </v-col>
            <v-col cols="6" md="2">
              <v-select
                v-model="search.status"
                :items="tabStatus"
                item-text="libelle"
                item-value="type"
                hide-details
                outlined
                expanded
                label="Status"
                dark
                clearable
                @keyup.enter="getList('search')"
                @change="getList('search')"
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                label="Email"
                outlined
                v-model="search.email"
                hide-details
                dark
                @keyup.enter="getList('search')"/>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="pt-0">
          <v-btn
            small
            block
            color="primary"
            @click="getList">
            Rechercher
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <v-data-table
      class="elevation-1"
      :headers="headers"
      v-model="usersSelect"
      :items="users"
      :items-per-page="perPageValue"
      :page.sync="page"
      :loading="isLoad"
      show-select
      @toggle-select-all="actionSelectAll"
      hide-default-footer>
      <template v-slot:item.pays="{ item }" v-if="users.length">
        {{ getPays(item.pays).nom }}
      </template>
      <template v-slot:item.role="{ item }" v-if="users.length && employer">
        {{ getRole(item.role) }}
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip
          :color="getStatus(item.status).couleur"
          dark style="width: 100%">
          {{ getStatus(item.status).libelle }}
        </v-chip>
      </template>
      <template v-slot:item.detail="{ item }">
        <v-btn small rounded color="green" @click="showDetail(item)">
          <v-icon color="white">mdi-eye</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-pagination
      v-model="page"
      :length="nbrPage"
      :total-visible="7"
      @input="getList"
      class="mt-2">
    </v-pagination>

    <v-dialog
      :width="currentComponent === 'DetailUser' ? 700 : 500"
      v-model="showModal">
      <component
        :is="currentComponent"
        :usersSelect="usersSelect"
        :userAdmin="userAdmin"
        :chapitres="chapitres"
        :loadingChap="loadingChap"
        :userSelect="userSelect"
        @resetUsersSelect="usersSelect = []"/>
    </v-dialog>

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getListUser } from '@/api/auth/index';
import { listeChapitre } from '@/api/chapitres/index';
import LISTE_PAYS from '@/services/pays';
import * as config from '@/configuration/user';

import EnvoiEmail from '@/components/backOffice/users/EnvoiEmail.vue';
import Souscription from '@/components/backOffice/users/Souscription.vue';
import DetailUser from '@/components/backOffice/users/DetailUser.vue';
import ArchiveUser from '@/components/backOffice/users/ArchiveUser.vue';
import AddToGroup from '@/components/backOffice/users/AddToGroup.vue';

export default {
  components: {
    EnvoiEmail,
    Souscription,
    DetailUser,
    ArchiveUser,
    AddToGroup,
  },
  data() {
    return {
      users: [],
      isLoad: false,
      tabStatus: [
        { type: 'Offline', libelle: 'Hors ligne', couleur: 'red' },
        { type: 'Online', libelle: 'En ligne', couleur: 'green' },
        { type: 'initial', libelle: 'Insc. en cours', couleur: 'orange' },
        { type: 'Archive', libelle: 'Archivé', couleur: 'grey' },
      ],
      usersSelect: [],
      loading: false,
      loadingChap: false,
      chapitres: [],
      listePays: LISTE_PAYS,
      userSelect: {},
      perPageValue: 10,
      page: 1,
      total: 1,
      search: {
        nom: '',
        prenom: '',
        email: '',
        pays_id: '',
        role: '',
        is_ad: false,
      },
      currentComponent: '',
      showModal: false,
      switch1: false,
      employer: false,
      config,
      roleSelect: null,
    };
  },
  computed: {
    ...mapGetters([
      'userAdmin',
    ]),
    nbrPage() {
      return Math.round(this.total / this.perPageValue);
    },
    listeActions() {
      return [
        { component: 'Souscription', libelle: 'Valider des souscriptions', show: true },
        { component: 'EnvoiEmail', libelle: 'Envoyer des e-mails', show: true },
        { component: 'ArchiveUser', libelle: 'Archiver des utilisateurs', show: true },
        { component: 'AddToGroup', libelle: 'Ajouter à un groupe', show: true },
      ];
    },
    headers() {
      return [
        {
          text: 'Nom', value: 'nom', show: true,
        },
        {
          text: 'Prenom', value: 'prenom', show: true,
        },
        {
          text: 'Email', value: 'email', show: true,
        },
        {
          text: 'Numéro', value: 'phone', width: 100, show: true,
        },
        {
          text: 'Pays', value: 'pays', width: 100, show: !this.employer,
        },
        {
          text: 'Rôle', value: 'role', width: 150, show: this.employer,
        },
        {
          text: 'Status', value: 'status', width: 100, show: true,
        },
        {
          text: 'Détail', value: 'detail', width: 100, show: true,
        },
      ].filter(el => el.show);
    },
  },
  methods: {
    ...mapActions([
      'showSnackMsg',
    ]),
    async getList(type) {
      if (type === 'search') this.page = 1;
      this.isLoad = true;
      try {
        if (!this.search.nom) delete this.search.nom;
        if (!this.search.prenom) delete this.search.prenom;
        if (!this.search.email) delete this.search.email;
        if (!this.search.pays_id) delete this.search.pays_id;
        if (!this.search.role) delete this.search.role;
        // if (!this.search.is_ad) delete this.search.is_ad;
        const { data } = (await getListUser(
          this.userAdmin.identifiant,
          this.page,
          this.perPageValue,
          this.search,
        ));
        this.users = data.list;
        this.total = data.page;
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
    getStatus(status) {
      if (!status) return { libelle: '', couleur: '' };
      return this.tabStatus.find(el => el.type === status);
    },
    async getListChap() {
      this.loadingChap = true;
      try {
        this.chapitres = (await listeChapitre()).data;
        this.chapitres.sort((a, b) => a.id - b.id);
        this.chapitres.forEach((chap, index) => {
          // eslint-disable-next-line no-param-reassign
          chap.index = index + 1;
          // eslint-disable-next-line no-param-reassign
          chap.text = `CHAP-${index + 1}`;
        });
        this.loadingChap = false;
      } catch (error) {
        this.loadingChap = false;
      }
    },
    getPays(id) {
      if (!id) return { nom: '' };
      return this.listePays.find(el => el.id === id);
    },
    getRole(item) {
      const role = config.LISTE.find(el => el.role === item);
      if (role) return role.libelle;
      return '';
    },
    showDetail(val) {
      this.userSelect = val;
      this.currentComponent = 'DetailUser';
      this.showModal = true;
    },
    actionShowModal(component) {
      this.currentComponent = component;
      this.showModal = true;
    },
    actionSelectAll(e) {
      if (!e.value) this.usersSelect = [];
    },
    swithToEmployer() {
      this.employer = !this.employer;
      this.search.is_ad = this.employer;
      this.getList('search');
    },
  },
  async mounted() {
    await this.getList();
    await this.getListChap();
  },
  destroyed() {},
};
</script>

<style>

</style>
