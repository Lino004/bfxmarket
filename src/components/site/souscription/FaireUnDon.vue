<template>
  <div style="height: 100%">
    <v-select
      v-model="paiementSelect"
      :items="paiements"
      label="Liste des paiements"
      outlined
    ></v-select>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        v-text="'CONTINUER'"
        v-if="paiementSelect === 'Paiement manuel'"
        color="primary"
        href="https://wa.me/22967328981?text=Je%20voudrais%20faire%20un%20don%20"/>
    </v-card-actions>
    <v-overlay :value="isLoad">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { souscript } from '@/api/auth/index';
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    chapitres: Array,
  },
  data: () => ({
    chapSelect: null,
    isLoad: false,
    paiements: [
      'Paiement manuel',
    ],
    paiementSelect: 'Paiement manuel',
  }),
  computed: {
    ...mapGetters([
      'user',
      'listeSouscript',
    ]),
  },
  methods: {
    ...mapActions([
      'showSnackMsg',
      'getUser',
    ]),
    async souscrire() {
      this.isLoad = true;
      try {
        if (this.chapSelect) {
          await souscript({
            chapitre: this.chapSelect,
            user: this.user.identifiant,
          });
          await this.getUser();
          this.showSnackMsg({
            color: 'success',
            msg: 'Souscription réussie',
          });
        } else {
          this.showSnackMsg({
            color: 'error',
            msg: 'Erreur: veuillez choisir un chapitre',
          });
        }
        this.isLoad = false;
        return '';
      } catch (error) {
        this.isLoad = false;
        if (error.response.status === 400) {
          this.showSnackMsg({
            color: 'error',
            msg: error.response.data.error,
          });
          return '';
        }
        if (error.response.status === 404) {
          this.showSnackMsg({
            color: 'error',
            msg: error.response.data.error,
          });
          return '';
        }
        this.showSnackMsg({
          color: 'error',
          msg: 'Erreur: la souscription n\'a pas aboutie',
        });
        return '';
      }
    },
  },
};
</script>

<style>

</style>
