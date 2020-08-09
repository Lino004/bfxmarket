<template>
  <v-card>
    <v-card-title
      class="headline bg-blue-grad"
      primary-title
    >
      Ajouter à un groupe d'employer
    </v-card-title>

    <v-card-text class="pa-5 black--text">
      <div class="mb-3">
        <v-select
          v-model="roleSelect"
          :items="config.LISTE"
          label="Choisissez le groupe"
          item-text="libelle"
          return-object
          hide-details
      ></v-select>
      </div>
      <div v-if="roleSelect">
        Vous êtes sur le point d'ajouter les utilisateurs suivant comme employer
        <strong>{{roleSelect.libelle}}</strong>:
        <ul class="mt-3">
          <li v-for="user in usersSelect" :key="user.identifiant">
            {{user.nom}} {{user.prenom}}
          </li>
        </ul>
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color=""
        text
        @click="$parent.$parent.$parent.showModal = false"
      >
        Annuler
      </v-btn>
      <v-btn
        color="green"
        dark
        @click="actionAddToGroup"
      >
        Ajouter
      </v-btn>
    </v-card-actions>

    <v-overlay :value="loading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
import { addToGroup } from '@/api/auth/index';
import * as config from '@/configuration/user';

export default {
  props: {
    usersSelect: Array,
    userAdmin: Object,
  },
  data: () => ({
    config,
    roleSelect: null,
    loading: false,
  }),
  methods: {
    async actionAddToGroup() {
      this.loading = true;
      try {
        if (this.usersSelect.length) {
          const data = this.usersSelect.map(el => ({
            is_ad: true,
            user: el.identifiant,
            role: this.roleSelect.role,
          }));
          await addToGroup(this.userAdmin.identifiant, { data });
          this.$parent.$parent.$parent.showSnackMsg({
            msg: 'Role mise a jour',
            color: 'success',
          });
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
