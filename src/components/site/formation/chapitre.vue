<template>
  <div>
     <PageTitle :breadcrumbs="breadcrumbs" :title="chapitre.titre"/>
     <section>
        <v-container fill-height v-html="chapitre.contenu">
        </v-container>
     </section>
  </div>
</template>

<script>
import PageTitle from '@/components/site/general/PageTitle.vue';
import { getChapitre } from '@/api/chapitres/index';

export default {
  components: { PageTitle },
  data: () => ({
    chapitre: {},
  }),
  computed: {
    breadcrumbs() {
      const { idModule, idFormation } = this.$route.params;
      return [
        {
          text: 'Accueil',
          disabled: false,
          to: '/home',
        },
        {
          text: 'Formation',
          disabled: false,
          to: `/home/formation/${idFormation}`,
        },
        {
          text: 'Module',
          disabled: false,
          to: `/home/formation/${idFormation}/module/${idModule}`,
        },
        {
          text: 'Chapitre',
          disabled: true,
        },
      ];
    },
  },
  methods: {
    async getChapitre() {
      this.isLoad = true;
      try {
        const { idChapitre } = this.$route.params;
        this.chapitre = (await getChapitre(idChapitre)).data;
        this.isLoad = false;
      } catch (error) {
        this.isLoad = false;
      }
    },
  },
  async mounted() {
    await this.getChapitre();
  },
};
</script>

<style>

</style>
