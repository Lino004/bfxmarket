<template>
  <v-card>
    <v-card-title
      class="headline bg-blue-grad"
      primary-title
    >
      Archiver des comptes
    </v-card-title>

    <v-card-text class="pa-5 black--text">
      Vous êtes sur le point d'arhiver les utilisateurs suivant:
      <ul>
        <li v-for="user in usersSelect" :key="user.identifiant">
          {{user.nom}} {{user.prenom}}
        </li>
      </ul>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        text
        @click="$parent.$parent.$parent.showModal = false"
      >
        Annuler
      </v-btn>
      <v-btn
        color="red"
        dark
        @click="archiveUsers"
      >
        Archiver
      </v-btn>
    </v-card-actions>

    <v-overlay :value="loading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
import { archiveUser } from '@/api/auth/index';

export default {
  props: {
    usersSelect: Array,
    userAdmin: Object,
  },
  data: () => ({
    chapitreSelect: null,
    loading: false,
  }),
  methods: {
    async archiveUsers() {
      this.loading = true;
      try {
        if (this.usersSelect.length) {
          const data = {
            users: this.usersSelect.map(el => el.identifiant),
          };
          await archiveUser(this.userAdmin.identifiant, data);
          this.$emit('resetUsersSelect');
          await this.$parent.$parent.$parent.getList();
          this.$parent.$parent.$parent.showModal = false;
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;
        throw error;
      }
    },
  },
};
</script>

<style>

</style>
