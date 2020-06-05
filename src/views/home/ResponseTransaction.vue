<template>
  <div style="height: 100%">
    <PageTitle :breadcrumbs="breadcrumbs" title="Transaction"/>
    <div></div>
    <v-overlay :value="isLoad">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import PageTitle from '@/components/site/general/PageTitle.vue';
import { updateStatusTransaction } from '@/api/transactions/index';
import { mapActions } from 'vuex';

export default {
  components: { PageTitle },
  data: () => ({
    breadcrumbs: [
      {
        text: 'Accueil',
        disabled: false,
        to: '/',
      },
      {
        text: 'Transaction Response',
        disabled: true,
      },
    ],
    isLoad: false,
  }),
  computed: {},
  methods: {
    ...mapActions([
      'showSnackMsg',
    ]),
    async action() {
      await updateStatusTransaction(
        this.$route.params.id,
        this.$route.query.status,
        this.$route.params.parrainage,
      );
      if (this.$route.query.status === 'approved') {
        this.$router.push({ name: 'bfx-chapitre', params: { idChapitre: this.$route.params.idChap } });
        this.showSnackMsg({
          color: 'success',
          msg: 'Souscription réussie',
        });
      }
      if (this.$route.query.status === 'canceled') {
        this.$router.push({ name: 'bfx-module', params: { idModule: this.$route.params.idModule } });
        this.showSnackMsg({
          color: 'error',
          msg: 'Erreur: la souscription n\'a pas aboutie',
        });
      }
    },
  },
  async mounted() {
    await this.action();
  },
};
</script>

<style>

</style>
