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
import * as config from '@/configuration/souscription';
import { getChapitre } from '@/api/chapitres/index';

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
    config,
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
      );
      if (this.$route.query.status === 'approved') {
        if (this.$route.params.idTypeService === this.config.TYPE_SERVICE_CHAPITRE) this.$router.push({ name: 'bfx-chapitre', params: { idChapitre: this.$route.params.idService } });
        if (this.$route.params.idTypeService === this.config.TYPE_SERVICE_MODULE) this.$router.push({ name: 'bfx-module', params: { idModule: this.$route.params.idService } });
        this.showSnackMsg({
          color: 'success',
          msg: 'Souscription réussie',
        });
      }
      if (this.$route.query.status === 'canceled') {
        if (this.$route.params.idTypeService === this.config.TYPE_SERVICE_CHAPITRE) {
          const { data } = (await getChapitre(this.$route.params.idService));
          console.log(data);
          this.$router.push({ name: 'bfx-module', params: { idModule: data.module.id } });
        }
        if (this.$route.params.idTypeService === this.config.TYPE_SERVICE_MODULE) this.$router.push({ name: 'bfx-formation', params: { idFormation: 9 } });
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
