<template>
  <v-card>
    <v-card-title
      class="headline bg-blue-grad"
      primary-title
    >
      Valider des souscriptions
    </v-card-title>

    <v-card-text class="pa-5">
      <v-select
        v-model="chapitreSelect"
        :items="chapitres"
        label="Choisissez le chapitre"
        item-value="id"
        item-text="titre"
        hide-details
        :disabled="loadingChap"
      ></v-select>
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
        color="primary"
        @click="envoiSouscription"
      >
        Envoyer
      </v-btn>
    </v-card-actions>

    <v-overlay :value="loading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
import { souscriptAdmin } from '@/api/auth/index';

export default {
  props: {
    usersSelect: Array,
    userAdmin: Object,
    chapitres: Array,
    loadingChap: Boolean,
  },
  data: () => ({
    chapitreSelect: null,
    loading: false,
  }),
  methods: {
    async envoiSouscription() {
      this.loading = true;
      try {
        if (this.chapitreSelect) {
          const requetes = [];
          this.usersSelect.forEach((user) => {
            requetes.push(souscriptAdmin({
              chapitre: this.chapitreSelect,
              user: user.identifiant,
              admin: this.userAdmin.identifiant,
            }));
          });
          await Promise.all(requetes);
          this.$parent.$parent.$parent.showSnackMsg({
            msg: 'Souscriptions faites avec succès',
            color: 'success',
          });
          await this.$parent.$parent.$parent.getList();
          this.loading = false;
          this.$parent.$parent.$parent.showModal = false;
          return '';
        }
        this.$parent.$parent.$parent.showSnackMsg({
          msg: 'Veillez selectionner un chapitre',
          color: 'error',
        });
        this.loading = false;
        this.$parent.$parent.$parent.showModal = false;
        return '';
      } catch (error) {
        if (error.response && error.response.status) {
          this.$parent.$parent.$parent.showSnackMsg({
            msg: error.response.data.error,
            color: 'error',
          });
          this.loading = false;
          return '';
        }
        this.$parent.$parent.$parent.showSnackMsg({
          msg: 'Problème lors de validation',
          color: 'error',
        });
        this.loading = false;
        this.$parent.$parent.$parent.showModal = false;
        return '';
      }
    },
  },
};
</script>

<style>

</style>
